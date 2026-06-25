export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  degree: string;
  school: string;
  description: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export type ProjectCategory = "automotive" | "brand" | "ai";

export interface ProjectMedia {
  url: string;
  caption: string;
  /** Natural pixel dimensions captured at upload (used for true aspect ratio). */
  width?: number | null;
  height?: number | null;
}

export interface Project {
  /** Present for DB-backed projects; used for the detail-page link. */
  id?: string;
  slug?: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  emoji: string;
  gradient: string;
  featured?: boolean;
  /** Optional cover image — e.g. an uploaded URL or "/images/projects/ittehad-steel.jpg".
   * Leave empty ("") to keep the gradient + emoji placeholder. */
  image?: string;
  /** Gallery of images/videos shown on the project detail page. */
  media?: ProjectMedia[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export type Certification = string;
