import { useCallback } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Areas from '../components/Areas';
import Contact from '../components/Contact';
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
      <Hero onLearnMore={scrollTo('services')} />
      <Services />
      <Testimonials />
      <Areas />
      <Contact />
    </>
  );
}
