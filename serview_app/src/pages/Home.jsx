import Seo from "../components/Seo";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import WhyChooseUs from "../components/WhyChooseUs";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaBanner from "../components/CtaBanner";
import { BRAND } from "../config/brand";

export default function Home() {
  return (
    <main>
      <Seo
        title={`Home Cleaning & Repairs You Can Trust in ${BRAND.serviceArea}`}
        description={`${BRAND.name} brings vetted professionals for home cleaning, handyman repairs, plumbing, electrical, painting and more across ${BRAND.serviceArea}. Transparent pricing, same-week scheduling, satisfaction guaranteed.`}
        path="/"
      />
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
}
