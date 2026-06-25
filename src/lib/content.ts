import { createClient } from "@supabase/supabase-js";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  INDUSTRIES,
  PROFILE_IMAGE,
  PROJECTS,
  SERVICES,
  SKILL_GROUPS,
  TOOLS,
} from "./data";
import type {
  Certification,
  Education,
  Experience,
  Project,
  Service,
  SkillGroup,
} from "./types";

/**
 * Read-only Supabase client for public content (no auth cookies).
 * RLS allows anonymous SELECT on every content table.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  url && anon
    ? createClient(url, anon, {
        auth: { persistSession: false },
        global: {
          fetch: (input: RequestInfo | URL, init?: RequestInit) =>
            fetch(input, { ...init, cache: "no-store" }),
        },
      })
    : null;

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return PROJECTS;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return PROJECTS;
  return data.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryLabel: r.category_label,
    description: r.description,
    emoji: r.emoji,
    gradient: r.gradient,
    featured: r.featured,
    image: r.image_url || "",
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) return PROJECTS.find((p) => p.slug === slug) ?? null;
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_media(url, caption, sort_order, width, height)")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  const media = (
    (data.project_media as {
      url: string;
      caption: string;
      sort_order: number;
      width: number | null;
      height: number | null;
    }[]) ?? []
  )
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((m) => ({
      url: m.url,
      caption: m.caption,
      width: m.width,
      height: m.height,
    }));
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    category: data.category,
    categoryLabel: data.category_label,
    description: data.description,
    emoji: data.emoji,
    gradient: data.gradient,
    featured: data.featured,
    image: data.image_url || "",
    media,
  };
}

export async function getExperience(): Promise<Experience[]> {
  if (!supabase) return EXPERIENCE;
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return EXPERIENCE;
  return data.map((r) => ({
    role: r.role,
    company: r.company,
    period: r.period,
    description: r.description,
    tags: r.tags ?? [],
  }));
}

export async function getServices(): Promise<Service[]> {
  if (!supabase) return SERVICES;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return SERVICES;
  return data.map((r) => ({
    number: r.number,
    title: r.title,
    description: r.description,
  }));
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (!supabase) return SKILL_GROUPS;
  const { data, error } = await supabase
    .from("skill_groups")
    .select("id, title, sort_order, skills(name, level, sort_order)")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return SKILL_GROUPS;
  return data.map((g) => ({
    title: g.title,
    skills: ((g.skills as { name: string; level: number; sort_order: number }[]) ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ name: s.name, level: s.level })),
  }));
}

export async function getEducation(): Promise<Education[]> {
  if (!supabase) return EDUCATION;
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return EDUCATION;
  return data.map((r) => ({
    degree: r.degree,
    school: r.school,
    description: r.description,
  }));
}

export async function getCertifications(): Promise<Certification[]> {
  if (!supabase) return CERTIFICATIONS;
  const { data, error } = await supabase
    .from("certifications")
    .select("name, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return CERTIFICATIONS;
  return data.map((r) => r.name);
}

export async function getTools(): Promise<string[]> {
  if (!supabase) return TOOLS;
  const { data, error } = await supabase
    .from("tools")
    .select("name, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return TOOLS;
  return data.map((r) => r.name);
}

export async function getIndustries(): Promise<string[]> {
  if (!supabase) return INDUSTRIES;
  const { data, error } = await supabase
    .from("industries")
    .select("name, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return INDUSTRIES;
  return data.map((r) => r.name);
}

export async function getProfileImage(): Promise<string> {
  if (!supabase) return PROFILE_IMAGE;
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "profile_image_url")
    .maybeSingle();
  if (error || !data) return PROFILE_IMAGE;
  return data.value || PROFILE_IMAGE;
}
