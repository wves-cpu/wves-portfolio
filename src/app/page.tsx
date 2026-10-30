'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/hooks/useLanguage';
import SmoothScroll from '@/components/motion/SmoothScroll';
import ScrollProgress from '@/components/motion/ScrollProgress';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SelectedWork from '@/components/sections/SelectedWork';
import Expertise from '@/components/sections/Expertise';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

const Preloader = dynamic(() => import('@/components/motion/Preloader'), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('@/components/motion/CustomCursor'), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <SmoothScroll>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <SelectedWork />
          <Expertise />
          <Education />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  );
}
