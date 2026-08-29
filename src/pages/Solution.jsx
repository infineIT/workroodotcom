import React from "react";
import { useParams } from "react-router-dom";
import PillButton from "@/components/ui-brand/PillButton";
import Reveal from "@/components/ui-brand/Reveal";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import FeatureCard from "@/components/ui-brand/FeatureCard";
import CaseStudyCard from "@/components/ui-brand/CaseStudyCard";
import FullBleedSection from "@/components/ui-brand/FullBleedSection";
import StatBlock from "@/components/ui-brand/StatBlock";
import FinalCta from "@/components/sections/FinalCta";
import PageNotFound from "@/lib/PageNotFound";
import { solutionByAudience } from "@/content/solutions";
import { featureBySlug } from "@/content/features";
import { testimonialByAudience } from "@/content/testimonials";

export default function Solution() {
  const { audience } = useParams();
  const sol = solutionByAudience(audience);

  if (!sol) return <PageNotFound />;

  const feats = sol.featureSlugs.map(featureBySlug).filter(Boolean);
  const testimonial = testimonialByAudience(sol.audience);

  return (
    <>
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            {sol.eyebrow}
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.2rem,5vw,3.4rem)] text-brand-ink">
            {sol.title} <Accent color={sol.accentColor}>{sol.accent}</Accent>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-brand-ink/70">
            {sol.intro}
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
            <PillButton variant="primary" to="/early-access">
              Request early access
            </PillButton>
            <PillButton variant="secondary" to="/how-it-works">
              See how it works
            </PillButton>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-brand-panel pt-0">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="What you get"
            title={<>The tools that <Accent>matter here</Accent>.</>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feats.map((f, i) => (
              <Reveal key={f.slug} delay={(i % 3) * 0.05}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  highlight={f.highlight}
                  className="bg-white"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FullBleedSection bg="blue">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <StatBlock value={sol.proofValue} label={sol.proofLabel} tone="dark" />
          </Reveal>
          <Reveal as="p" delay={0.05} className="text-white/85 text-lg leading-relaxed">
            {sol.proofBody}
          </Reveal>
        </div>
      </FullBleedSection>

      {testimonial && (
        <section className="section-pad bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <CaseStudyCard testimonial={testimonial} variant="navy" />
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
