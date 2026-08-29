import React from "react";
import FullBleedSection from "@/components/ui-brand/FullBleedSection";
import PillButton from "@/components/ui-brand/PillButton";
import Reveal from "@/components/ui-brand/Reveal";

export default function FinalCta({
  bg = "navy",
  title = (
    <>
      Put your workshop <span className="text-brand-lime">on the record</span>.
    </>
  ),
  sub = "Workshops across Australia use Workroo to build trust, cut friction and grow. Yours can too.",
}) {
  return (
    <FullBleedSection bg={bg}>
      <div className="max-w-2xl mx-auto text-center">
        <Reveal as="h2" className="text-white text-[clamp(1.9rem,4vw,3rem)]">
          {title}
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-5 text-white/70 text-lg">
          {sub}
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <PillButton variant="primary" to="/early-access">
            Request early access
          </PillButton>
          <PillButton variant="on-dark" to="/how-it-works">
            See how it works
          </PillButton>
        </Reveal>
        <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/45">
          No setup fees · No credit card required
        </p>
      </div>
    </FullBleedSection>
  );
}
