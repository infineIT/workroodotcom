import React, { useCallback, useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import Kangaroo from "./Kangaroo";
import {
  CHAT_FORM_NAME,
  CHAT_REVEAL_DELAY,
  chatIntro,
  chatSteps,
  chatClosing,
  chatError,
} from "@/content/chatIntake";

const DONE_KEY = "roo-chat:v1:done";
const DISMISS_KEY = "roo-chat:v1:dismissed";

const readFlag = (storage, key) => {
  try {
    return storage.getItem(key) === "1";
  } catch {
    return false;
  }
};
const writeFlag = (storage, key) => {
  try {
    storage.setItem(key, "1");
  } catch {
    /* private mode — non-fatal */
  }
};

const fill = (text, answers) =>
  text.replace(/\{name\}/g, (answers.name || "there").split(/\s+/)[0]);

let msgId = 0;

export default function ChatWidget() {
  // hidden -> peek (mascot out) -> open (panel)
  const [phase, setPhase] = useState("hidden");
  const [mounted, setMounted] = useState(false); // drives the entrance transition
  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("idle"); // idle | typing | sending | done | error
  const [fieldError, setFieldError] = useState("");
  const [botField, setBotField] = useState("");

  const aliveRef = useRef(true);
  const timers = useRef([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const startedRef = useRef(false);

  const after = useCallback((ms, fn) => {
    const t = setTimeout(() => {
      if (aliveRef.current) fn();
    }, ms);
    timers.current.push(t);
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    const owned = timers.current;
    return () => {
      aliveRef.current = false;
      owned.forEach(clearTimeout);
    };
  }, []);

  // Reveal the mascot once the visitor has spent a little time on the site.
  useEffect(() => {
    if (readFlag(window.localStorage, DONE_KEY)) return;
    if (readFlag(window.sessionStorage, DISMISS_KEY)) return;
    const t = setTimeout(() => {
      if (!aliveRef.current) return;
      setPhase("peek");
      requestAnimationFrame(() => setMounted(true));
    }, CHAT_REVEAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Keep the transcript pinned to the newest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (phase === "open" && status === "idle" && stepIndex >= 0) {
      inputRef.current?.focus();
    }
  }, [phase, status, stepIndex]);

  const pushBot = useCallback((text) => {
    setMessages((m) => [...m, { id: ++msgId, from: "bot", text }]);
  }, []);
  const pushUser = useCallback((text) => {
    setMessages((m) => [...m, { id: ++msgId, from: "user", text }]);
  }, []);

  const askStep = useCallback(
    (index, currentAnswers) => {
      setStatus("typing");
      after(650, () => {
        pushBot(fill(chatSteps[index].bot, currentAnswers));
        setStepIndex(index);
        setStatus("idle");
      });
    },
    [after, pushBot]
  );

  const startConversation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStatus("typing");
    after(500, () => {
      pushBot(chatIntro);
      askStep(0, {});
    });
  }, [after, askStep, pushBot]);

  const openPanel = () => {
    setPhase("open");
    setMounted(true);
    startConversation();
  };

  const dismissPeek = () => {
    writeFlag(window.sessionStorage, DISMISS_KEY);
    setMounted(false);
    after(220, () => setPhase("hidden"));
  };

  const closePanel = () => {
    if (status === "done") {
      setMounted(false);
      after(220, () => setPhase("hidden"));
    } else {
      setPhase("peek");
    }
  };

  const send = useCallback(
    async (finalAnswers) => {
      setStatus("sending");
      const body = new URLSearchParams({
        "form-name": CHAT_FORM_NAME,
        "bot-field": botField,
        ...finalAnswers,
      }).toString();
      try {
        const res = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        if (!res.ok) throw new Error(`Submission failed (${res.status})`);
        if (!aliveRef.current) return;
        pushBot(chatClosing);
        setStatus("done");
        writeFlag(window.localStorage, DONE_KEY);
      } catch (err) {
        console.error("Chat intake submission failed:", err);
        if (!aliveRef.current) return;
        pushBot(chatError);
        setStatus("error");
      }
    },
    [botField, pushBot]
  );

  const answerCurrent = (rawValue) => {
    const step = chatSteps[stepIndex];
    const value = rawValue.trim();

    if (step.required && !value) {
      setFieldError("This one I do need.");
      return;
    }
    if (value && typeof step.validate === "function") {
      const result = step.validate(value);
      if (result !== true) {
        setFieldError(typeof result === "string" ? result : "That doesn't look right.");
        return;
      }
    }

    setFieldError("");
    setDraft("");
    pushUser(value || "— skipped —");

    const nextAnswers = { ...answers, [step.key]: value };
    setAnswers(nextAnswers);

    if (stepIndex < chatSteps.length - 1) {
      askStep(stepIndex + 1, nextAnswers);
    } else {
      setStatus("typing");
      after(500, () => send(nextAnswers));
    }
  };

  if (phase === "hidden") return null;

  const step = stepIndex >= 0 ? chatSteps[stepIndex] : null;
  const canType =
    phase === "open" && status === "idle" && step && step.type === "text";
  const showChoices =
    phase === "open" && status === "idle" && step && step.type === "choice";

  return (
    <div className="fixed bottom-4 right-4 z-[90] sm:bottom-6 sm:right-6 print:hidden">
      {phase === "peek" && (
        <div
          className={`flex items-end gap-2 transition-all duration-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={openPanel}
            className="group relative flex items-center gap-3 rounded-pill border border-brand-line bg-white py-2.5 pl-3 pr-4 shadow-[0_12px_40px_-12px_rgba(18,20,36,0.35)] transition-transform hover:-translate-y-0.5"
            aria-label="Open the chat with Workroo"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-lime">
              <Kangaroo className="h-9 w-9 -translate-y-px" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-brand-ink">
                Hey — let's chat
              </span>
              <span className="block text-xs text-brand-slate">
                Got a sec? 6 quick questions
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={dismissPeek}
            aria-label="Dismiss"
            className="mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-ink/70 text-white transition-colors hover:bg-brand-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {phase === "open" && (
        <div
          role="dialog"
          aria-label="Chat with Workroo"
          className={`flex h-[68vh] max-h-[560px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-card border border-brand-line bg-white shadow-[0_24px_70px_-20px_rgba(18,20,36,0.45)] transition-all duration-300 sm:w-[380px] ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* header */}
          <div className="flex items-center gap-3 border-b border-brand-line bg-brand-panel px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lime">
              <Kangaroo className="h-7 w-7 -translate-y-px" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight text-brand-ink">
                Roo · Workroo
              </p>
              <p className="text-xs text-brand-slate">Usually replies in a day</p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-brand-slate transition-colors hover:bg-brand-ink/5 hover:text-brand-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* transcript */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-white px-4 py-4"
          >
            {messages.map((m) =>
              m.from === "bot" ? (
                <div key={m.id} className="flex gap-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lime">
                    <Kangaroo className="h-5 w-5 -translate-y-px" />
                  </span>
                  <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-brand-panel px-3.5 py-2.5 text-sm leading-relaxed text-brand-ink">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-brand-blue px-3.5 py-2.5 text-sm leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              )
            )}
            {(status === "typing" || status === "sending") && (
              <div className="flex gap-2">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lime">
                  <Kangaroo className="h-5 w-5 -translate-y-px" />
                </span>
                <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-brand-panel px-3.5 py-3">
                  <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                </span>
              </div>
            )}
          </div>

          {/* input */}
          <div className="border-t border-brand-line bg-white px-3 py-3">
            {fieldError && (
              <p className="mb-2 px-1 text-xs text-brand-blue">{fieldError}</p>
            )}

            {showChoices && (
              <div className="flex flex-wrap gap-2">
                {step.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answerCurrent(opt)}
                    className="rounded-pill border border-brand-line bg-white px-3.5 py-2 text-sm font-medium text-brand-ink transition-colors hover:border-brand-blue hover:bg-brand-blue/5"
                  >
                    {opt}
                  </button>
                ))}
                {!step.required && <SkipButton onClick={() => answerCurrent("")} />}
              </div>
            )}

            {canType && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  answerCurrent(draft);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      answerCurrent(draft);
                    }
                  }}
                  placeholder={step.placeholder}
                  className="max-h-28 min-h-[42px] flex-1 resize-none rounded-2xl border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-dark"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}

            {canType && !step.required && (
              <div className="mt-2">
                <SkipButton onClick={() => answerCurrent("")} />
              </div>
            )}

            {status === "sending" && (
              <p className="px-1 py-2 text-sm text-brand-slate">Sending your answers…</p>
            )}

            {status === "error" && (
              <button
                type="button"
                onClick={() => send(answers)}
                className="rounded-pill bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Try again
              </button>
            )}

            {status === "done" && (
              <button
                type="button"
                onClick={closePanel}
                className="w-full rounded-pill bg-brand-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-ink/90"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Dot({ delay = "0ms" }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-brand-slate"
      style={{ animationDelay: delay }}
    />
  );
}

function SkipButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-pill px-3 py-2 text-sm font-medium text-brand-slate transition-colors hover:text-brand-ink"
    >
      Skip
    </button>
  );
}
