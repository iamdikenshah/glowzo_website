import { useCallback } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
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
      <Stats />
      <Services />
      <Pricing />
      <Testimonials />
      <About />
    </>
  );
}
