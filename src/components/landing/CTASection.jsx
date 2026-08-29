import React, { useState } from "react";
import { Check } from "lucide-react";

/* Must match the static declaration in public/__forms.html — Netlify drops
   fields it has not seen there. */
const FORM_NAME = "early-access";

const included = [
  "Live job capture and customer portal",
  "Real-time messaging and alerts",
  "Cloud dashboard on any device",
  "A digital record for every vehicle",
  "No setup fees",
];

const fieldClass =
  "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-brand-ink text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";
const labelClass =
  "block mb-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [workshopSize, setWorkshopSize] = useState("");
  const [botField, setBotField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": botField,
      "workshop-name": workshopName,
      "contact-name": name,
      email,
      phone,
      "workshop-size": workshopSize,
    }).toString();

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSubmitted(true);
    } catch (err) {
      // Never show the success state on a failed post — the lead would be lost
      // silently with the visitor believing they had signed up.
      setError(
        "Something went wrong sending that. Please try again, or email workroo@infineit.com."
      );
      console.error("Early access submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate mb-5">
              Get started
            </p>
            <h2 className="text-brand-ink text-[clamp(1.9rem,4vw,2.9rem)] mb-6">
              Put your workshop <span className="text-brand-blue">on the record</span>.
            </h2>
            <p className="text-brand-ink/70 text-lg leading-relaxed max-w-md mb-10">
              Workshops across Australia use Workroo to build trust, cut
              friction and grow. Yours can too.
            </p>

            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-ink/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lime">
                    <Check className="h-3.5 w-3.5 text-brand-ink" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-brand-line bg-brand-panel p-7 sm:p-9">
            {submitted ? (
              <div className="flex flex-col justify-center h-full">
                <p className="font-display font-semibold text-brand-ink text-[clamp(1.5rem,3vw,2.2rem)] mb-4">
                  You're on the list.
                </p>
                <p className="text-brand-slate">
                  We'll be in touch at{" "}
                  <span className="text-brand-ink">{email}</span>.
                </p>
              </div>
            ) : (
              <div>
                <p className="font-display font-semibold text-brand-ink text-[clamp(1.3rem,2.4vw,1.7rem)] mb-1">
                  Request early access
                </p>
                <p className="text-brand-slate text-sm mb-7">
                  No credit card required.
                </p>

                <form
                  name={FORM_NAME}
                  method="POST"
                  action="/__forms.html"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  {/* Honeypot: hidden from people, tempting to bots. */}
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Do not fill this in
                      <input
                        type="text"
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={botField}
                        onChange={(e) => setBotField(e.target.value)}
                      />
                    </label>
                  </p>
                  <div>
                    <label htmlFor="cta-workshop" className={labelClass}>
                      Workshop name
                    </label>
                    <input
                      id="cta-workshop"
                      name="workshop-name"
                      type="text"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-name" className={labelClass}>
                      Contact name
                    </label>
                    <input
                      id="cta-name"
                      name="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className={labelClass}>
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className={labelClass}>
                      Phone number
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-size" className={labelClass}>
                      Workshop size
                    </label>
                    <select
                      id="cta-size"
                      name="workshop-size"
                      value={workshopSize}
                      onChange={(e) => setWorkshopSize(e.target.value)}
                      className={fieldClass}
                    >
                      <option value="">Select size</option>
                      <option>Solo mechanic</option>
                      <option>2–5 staff</option>
                      <option>5–20 staff</option>
                      <option>20+ staff / dealership</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-blue px-6 py-3 text-sm font-semibold text-white leading-none transition-colors duration-200 hover:bg-brand-blue-dark disabled:opacity-55 disabled:pointer-events-none"
                  >
                    {loading ? "Sending…" : "Request early access"}
                  </button>

                  {error && (
                    <p role="alert" className="text-brand-blue text-sm">
                      {error}
                    </p>
                  )}
                </form>

                <p className="text-brand-slate/80 text-xs mt-6">
                  By submitting, you agree to be contacted by the Workroo team.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
