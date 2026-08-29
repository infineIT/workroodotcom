import React from "react";
import Reveal from "@/components/ui-brand/Reveal";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import MediaCard from "@/components/ui-brand/MediaCard";
import StatBlock from "@/components/ui-brand/StatBlock";
import FullBleedSection from "@/components/ui-brand/FullBleedSection";
import FinalCta from "@/components/sections/FinalCta";
import { steps, proof } from "@/content/proof";

export default function HowItWorks() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            How it works
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.2rem,5vw,3.4rem)] text-brand-ink">
            Every repair, <Accent>on the record</Accent>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-brand-ink/70">
            Four steps, from booking to a customer who comes back. Workroo keeps
            the whole workshop and every customer on the same page.
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white pt-0">
        <div className="max-w-6xl mx-auto px-6 space-y-16 lg:space-y-24">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <MediaCard src={s.image} alt={s.alt} />
              </Reveal>
              <Reveal delay={0.05}>
                <span className="text-sm font-semibold text-brand-blue">
                  Step {s.step}
                </span>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] text-brand-ink">
                  {s.title}
                </h2>
                <p className="mt-4 text-brand-ink/70 leading-relaxed text-lg max-w-md">
                  {s.description}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <FullBleedSection bg="navy">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="The numbers"
          title={<>What that adds up to.</>}
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {proof.map((p) => (
            <Reveal key={p.label}>
              <StatBlock value={p.value} label={p.label} tone="dark" />
            </Reveal>
          ))}
        </div>
      </FullBleedSection>

      <FinalCta />
    </>
  );
}
