import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import WordmarkMarquee from "@/components/landing/WordmarkMarquee";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import BlogPreviewSection from "@/components/landing/BlogPreviewSection";
import { usePageMotion } from "@/lib/motion";

export default function Landing() {
  const motionRef = usePageMotion();
  const location = useLocation();

  // Honour /#section links arriving from other routes
  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ block: "start" });
  }, [location.hash]);

  return (
    <div ref={motionRef} className="min-h-screen bg-cream font-body overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <WordmarkMarquee />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
    </div>
  );
}
