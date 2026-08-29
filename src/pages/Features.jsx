import React from "react";
import PillButton from "@/components/ui-brand/PillButton";
import Reveal from "@/components/ui-brand/Reveal";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import FeatureCard from "@/components/ui-brand/FeatureCard";
import CaseStudyCard from "@/components/ui-brand/CaseStudyCard";
import FullBleedSection from "@/components/ui-brand/FullBleedSection";
import FinalCta from "@/components/sections/FinalCta";
import { features } from "@/content/features";
import { testimonialByAudience } from "@/content/testimonials";

const nigal = testimonialByAudience("operations");
const firstHalf = features.slice(0, 6);
const secondHalf = features.slice(6);

function Grid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <Reveal key={f.slug} delay={(i % 3) * 0.05}>
          <FeatureCard
            id={f.slug}
            icon={f.icon}
            title={f.title}
            description={f.description}
            highlight={f.highlight}
          />
        </Reveal>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            Features
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.2rem,5vw,3.4rem)] text-brand-ink">
            Everything your workshop runs on, <Accent>in one place</Accent>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-brand-ink/70">
            Eleven connected tools — from the booking diary to live customer
            updates to reporting. Built for auto workshops, mobile-first, cloud-first.
          </Reveal>
        </div>
      </section>

      <section className="pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Grid items={firstHalf} />
        </div>
      </section>

      <FullBleedSection bg="blue">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal as="h2" className="text-white text-[clamp(1.8rem,4vw,2.8rem)]">
            Every step of the repair, <span className="text-brand-lime">on the record</span>.
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-5 text-white/80 text-lg">
            The whole point: customers see what they pay for, and mechanics get
            credit for the work they do.
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PillButton variant="primary" to="/early-access">
              Request early access
            </PillButton>
          </Reveal>
        </div>
      </FullBleedSection>

      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Grid items={secondHalf} />
        </div>
      </section>

      {nigal && (
        <section className="section-pad bg-brand-panel">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading
              align="center"
              eyebrow="From the floor"
              title={<>Visibility you can <Accent>step away from</Accent>.</>}
            />
            <div className="mt-10">
              <CaseStudyCard testimonial={nigal} variant="navy" />
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
