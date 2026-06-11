import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";

import TestimonialsSection from "@/components/landing/TestimonialsSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import BlogPreviewSection from "@/components/landing/BlogPreviewSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-alabaster font-body overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
    </div>
  );
}