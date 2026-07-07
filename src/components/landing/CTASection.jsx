import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

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
  const [workshopName, setWorkshopName] = useState("");
  const [workshopSize, setWorkshopSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: "charith@infineit.com",
      subject: "New Early Access Request — workroo",
      body: `New early access request received:\n\nWorkshop Name: ${workshopName}\nContact Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nWorkshop Size: ${workshopSize}`,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="cta" className="section-pad bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div data-reveal-group>
            <p className="eyebrow mb-5" data-reveal>
              Get started
            </p>
            <h2
              className="text-ink mb-6"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
              data-reveal
            >
              Put your workshop <span className="text-rust">on the record</span>.
            </h2>
            <p className="text-ink/75 text-lg leading-relaxed max-w-md mb-12" data-reveal>
              Workshops across Australia use Workroo to build trust, cut
              friction and grow. Yours can too.
            </p>

            <ul data-reveal>
              {included.map((item, i) => (
                <li
                  key={item}
                  className={`hairline-t py-4 text-ink/80 text-sm flex items-baseline gap-4 ${
                    i === included.length - 1 ? "hairline-b" : ""
                  }`}
                >
                  <span className="text-rust text-xs font-semibold">
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
                  className="font-bold text-ink mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  You're on the list.
                </p>
                <p className="text-taupe">
                  We'll be in touch at <span className="text-ink">{email}</span>.
                </p>
              </div>
            ) : (
              <div data-reveal>
                <p
                  className="font-bold text-ink mb-2"
                  style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)" }}
                >
                  Request early access
                </p>
                <p className="text-taupe text-sm mb-8">No credit card required.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="cta-workshop" className="eyebrow eyebrow-muted block mb-1">
                      Workshop name
                    </label>
                    <input
                      id="cta-workshop"
                      type="text"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-name" className="eyebrow eyebrow-muted block mb-1">
                      Contact name
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="eyebrow eyebrow-muted block mb-1">
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className="eyebrow eyebrow-muted block mb-1">
                      Phone number
                    </label>
                    <input
                      id="cta-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-underline"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-size" className="eyebrow eyebrow-muted block mb-1">
                      Workshop size
                    </label>
                    <select
                      id="cta-size"
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
                </form>

                <p className="text-taupe text-xs mt-6">
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
