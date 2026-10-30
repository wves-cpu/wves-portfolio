import { Suspense } from 'react';
import { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectPageContent from './ProjectPageContent';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found — wves.',
    };
  }

  return {
    title: `${project.name} — wves.`,
    description: project.description.en,
    openGraph: {
      title: `${project.name} — wves.`,
      description: project.description.en,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-label">Loading...</div>
      </div>
    }>
      <ProjectPageContent slug={slug} />
    </Suspense>
  );
}
