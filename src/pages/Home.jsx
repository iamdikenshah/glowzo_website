import { useCallback } from 'react';
import Hero from '../components/Hero';
import AvailabilityBand from '../components/AvailabilityBand';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import CtaBand from '../components/CtaBand';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal([]);

  const scrollTo = useCallback((id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Hero onLearnMore={scrollTo('pricing')} />
      <AvailabilityBand />
      <Stats />
      <About />
      <Services />
      <WhyChoose />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
