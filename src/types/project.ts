export interface Project {
  id: number;
  slug: string;
  name: string;
  category: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  coverImage: string;
  gallery: string[];
  accentColor: string;
  features: { en: string[]; ru: string[]; uz: string[] };
  technologies: string[] | null;
  liveUrl: string | null;
  previewUrl: string | null;
  githubUrl: string | null;
  allowEmbed: boolean;
  status: 'live' | 'development' | 'concept';
  visualDirection: string;
}
