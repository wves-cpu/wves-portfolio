export interface Skill {
  name: string;
  category: { en: string; ru: string; uz: string };
}

export const skills: Skill[] = [
  { name: 'JavaScript', category: { en: 'Frontend', ru: 'Frontend', uz: 'Frontend' } },
  { name: 'React', category: { en: 'Frontend', ru: 'Frontend', uz: 'Frontend' } },
  { name: 'Node.js', category: { en: 'Backend', ru: 'Backend', uz: 'Backend' } },
  { name: 'MongoDB', category: { en: 'Database', ru: 'База данных', uz: 'Ma\'lumotlar bazasi' } },
  { name: 'Postman', category: { en: 'Development Tools', ru: 'Инструменты разработки', uz: 'Dasturlash vositalari' } },
];
