import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PillButton from "@/components/ui-brand/PillButton";
import Reveal from "@/components/ui-brand/Reveal";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import LogoRail from "@/components/ui-brand/LogoRail";
import MediaCard from "@/components/ui-brand/MediaCard";
import FeatureCard from "@/components/ui-brand/FeatureCard";
import StatBlock from "@/components/ui-brand/StatBlock";
import CaseStudyCard from "@/components/ui-brand/CaseStudyCard";
import FullBleedSection from "@/components/ui-brand/FullBleedSection";
import FinalCta from "@/components/sections/FinalCta";
import BlogPreview from "@/components/sections/BlogPreview";
import { features } from "@/content/features";
import { testimonials } from "@/content/testimonials";
import { proof, steps, IMAGES } from "@/content/proof";

const homeSteps = steps.slice(0, 3);
const homeFeatures = features.slice(0, 6);
const cardVariants = ["white", "navy", "blue"];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            Live workshop &amp; customer updates
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.4rem,6vw,4rem)] text-brand-ink">
            Mechanics and customers, <Accent>connected in real time.</Accent>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-brand-ink/70 max-w-xl mx-auto">
            A live, transparent record of every repair. Customers see what they
            pay for. Mechanics get credit for the work they do.
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
            <PillButton variant="primary" to="/early-access">
              Request early access
            </PillButton>
            <PillButton variant="secondary" to="/how-it-works">
              See how it works
            </PillButton>
          </Reveal>
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-brand-slate">
            No setup fees · No credit card required
          </p>
        </div>
        <Reveal delay={0.2} className="max-w-5xl mx-auto px-6 mt-14">
          <MediaCard src={IMAGES.customerView} alt="Workroo customer view on a phone" ratio="aspect-[16/9]" />
        </Reveal>
      </section>

      {/* 2 — Logo rail */}
      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <LogoRail />
        </div>
      </section>

      {/* 3 — Full-bleed: make every repair visible */}
      <FullBleedSection bg="blue">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal as="h2" className="text-white text-[clamp(1.9rem,4vw,3rem)]">
              Make every repair <span className="text-brand-lime">visible</span>.
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 text-white/80 text-lg leading-relaxed">
              Customers watch the work on their vehicle as it happens. Every step
              is documented in real time — a true record of the car that builds
              trust and keeps people coming back.
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <PillButton variant="primary" to="/features">
                Explore the features
              </PillButton>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MediaCard src={IMAGES.mechanic} alt="Mechanic documenting a repair" />
          </Reveal>
        </div>
      </FullBleedSection>

      {/* 4 — How it works, condensed */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="How it works"
            title={<>Every repair, <Accent>on the record</Accent>.</>}
          />
          <div className="mt-14 space-y-16">
            {homeSteps.map((s, i) => (
              <div
                key={s.step}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <MediaCard src={s.image} alt={s.alt} />
                </Reveal>
                <Reveal delay={0.05}>
                  <span className="text-sm font-semibold text-brand-blue">{s.step}</span>
                  <h3 className="mt-3 text-2xl text-brand-ink">{s.title}</h3>
                  <p className="mt-3 text-brand-ink/70 leading-relaxed max-w-md">
                    {s.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
            >
              See the full walkthrough <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 — Feature bento */}
      <section className="section-pad bg-brand-panel">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Features"
            title={<>Every tool your workshop <Accent>needs</Accent>.</>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeFeatures.map((f, i) => (
              <Reveal key={f.slug} delay={(i % 3) * 0.05}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  className="bg-white"
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/features"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
            >
              Explore all 11 features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — Proof band */}
      <FullBleedSection bg="navy">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="The numbers"
          title={<>Proof from the <span className="text-brand-lime">workshop floor</span>.</>}
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {proof.map((p) => (
            <Reveal key={p.label}>
              <StatBlock value={p.value} label={p.label} tone="dark" />
            </Reveal>
          ))}
        </div>
      </FullBleedSection>

      {/* 7 — Testimonials */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Testimonials"
            title={<>Real words from <Accent>real workshops</Accent>.</>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <CaseStudyCard testimonial={t} variant={cardVariants[i % 3]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Blog preview */}
      <BlogPreview />

      {/* 9 — Final CTA */}
      <FinalCta />
    </>
  );
}
