"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import type { ProjectCategory } from "@/lib/types";

type Filter = "all" | ProjectCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Automotive", value: "automotive" },
  { label: "Brand", value: "brand" },
  { label: "AI", value: "ai" },
];

interface WorkProps {
  projects?: typeof PROJECTS;
}

export default function Work({ projects = PROJECTS }: WorkProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const isActive = (cat: ProjectCategory) =>
    activeFilter === "all" || activeFilter === cat;

  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold">
              Selected Work
            </span>
            <h2 className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl">
              Campaigns &amp; <em className="italic text-gold">Projects</em>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  activeFilter === f.value
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted hover:border-gold/50 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const active = isActive(project.category);
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`group relative overflow-hidden border border-border transition-all duration-300 ${
                  project.featured ? "sm:col-span-2" : ""
                } ${active ? "" : "pointer-events-none opacity-25"}`}
              >
                <Link
                  href={project.slug ? `/work/${project.slug}` : "#"}
                  className={`relative flex items-center justify-center bg-gradient-to-br ${project.gradient} ${
                    project.featured ? "aspect-[16/9]" : "aspect-[16/10]"
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={
                        project.featured
                          ? "(max-width: 640px) 100vw, 66vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                    />
                  ) : (
                    <span className="text-6xl opacity-80 transition-transform duration-500 group-hover:scale-110">
                      {project.emoji}
                    </span>
                  )}

                  {/* Always-visible info overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent p-6 pt-16">
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                      {project.categoryLabel}
                    </span>
                    <h3 className="mt-1.5 font-cormorant text-2xl font-light leading-tight text-white">
                      {project.title}
                    </h3>
                    <span className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View Project →
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
