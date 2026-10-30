'use client';

import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/hooks/useLanguage';
import { projects } from '@/data/projects';
import ProjectDetail from '@/components/projects/ProjectDetail';
import SmoothScroll from '@/components/motion/SmoothScroll';

export default function ProjectPageContent({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <LanguageProvider>
      <SmoothScroll>
        <ProjectDetail project={project} />
      </SmoothScroll>
    </LanguageProvider>
  );
}
