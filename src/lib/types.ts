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

export interface Project {
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  emoji: string;
  gradient: string;
  featured?: boolean;
  /** Optional image under /public/images/projects/ — e.g. "/images/projects/ittehad-steel.jpg".
   * Leave empty ("") to keep the gradient + emoji placeholder. */
  image?: string;
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
