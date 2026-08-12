import React, { useState } from "react";

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
    <section id="cta" className="section-pad bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div data-reveal-group>
            <p className="eyebrow label-bar mb-5" data-reveal>
              Get started
            </p>
            <h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
              data-reveal
            >
              Put your workshop <span className="text-rust">on the record</span>.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md mb-12" data-reveal>
              Workshops across Australia use Workroo to build trust, cut
              friction and grow. Yours can too.
            </p>

            <ul data-reveal>
              {included.map((item, i) => (
                <li
                  key={item}
                  className={`border-t border-white/15 py-4 text-white/80 text-sm flex items-baseline gap-4 ${
                    i === included.length - 1 ? "border-b border-white/15" : ""
                  }`}
                >
                  <span className="text-rust-bright text-xs font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal-group>
            {submitted ? (
              <div className="flex flex-col justify-center h-full" data-reveal>
                <p
                  className="font-bold text-white mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  You're on the list.
                </p>
                <p className="text-white/60">
                  We'll be in touch at <span className="text-white">{email}</span>.
                </p>
              </div>
            ) : (
              <div data-reveal>
                <p
                  className="font-display font-bold uppercase text-white mb-2"
                  style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)" }}
                >
                  Request early access
                </p>
                <p className="text-white/50 text-sm mb-8">No credit card required.</p>

                <form
                  name={FORM_NAME}
                  method="POST"
                  action="/__forms.html"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-5"
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
                    <label htmlFor="cta-workshop" className="eyebrow !text-white/50 block mb-1">
                      Workshop name
                    </label>
                    <input
                      id="cta-workshop"
                      name="workshop-name"
                      type="text"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-name" className="eyebrow !text-white/50 block mb-1">
                      Contact name
                    </label>
                    <input
                      id="cta-name"
                      name="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="eyebrow !text-white/50 block mb-1">
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className="eyebrow !text-white/50 block mb-1">
                      Phone number
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-size" className="eyebrow !text-white/50 block mb-1">
                      Workshop size
                    </label>
                    <select
                      id="cta-size"
                      name="workshop-size"
                      value={workshopSize}
                      onChange={(e) => setWorkshopSize(e.target.value)}
                      className="input-underline text-ink"
                    >
                      <option value="">Select size</option>
                      <option>Solo mechanic</option>
                      <option>2–5 staff</option>
                      <option>5–20 staff</option>
                      <option>20+ staff / dealership</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="btn-pill btn-pill-solid mt-2">
                    {loading ? "Sending…" : "Request early access"}
                  </button>

                  {error && (
                    <p role="alert" className="text-rust-bright text-sm">
                      {error}
                    </p>
                  )}
                </form>

                <p className="text-white/40 text-xs mt-6">
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
