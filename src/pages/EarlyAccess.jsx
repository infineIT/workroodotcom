import React from "react";
import Reveal from "@/components/ui-brand/Reveal";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import CTASection from "@/components/landing/CTASection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "When does Workroo launch?",
    a: "Workroo is in early access now. Join the list and we'll bring your workshop on board as we roll out.",
  },
  {
    q: "Is there a contract?",
    a: "No lock-in contract. Early access workshops help shape the product and can step away at any time.",
  },
  {
    q: "What does it cost?",
    a: "Pricing isn't set yet. There are no setup fees, and early access workshops get preferential terms at launch.",
  },
];

export default function EarlyAccess() {
  return (
    <>
      <section className="section-pad bg-white pb-0">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            Early access
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.2rem,5vw,3.4rem)] text-brand-ink">
            Bring your workshop <Accent>on the record</Accent>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-brand-ink/70">
            Tell us a little about your workshop and we'll be in touch. No setup
            fees, no credit card, no lock-in.
          </Reveal>
        </div>
      </section>

      <CTASection />

      <section className="section-pad bg-brand-panel">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title={<>Good to <Accent>know</Accent>.</>}
          />
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-lg text-brand-ink">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-ink/70 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
