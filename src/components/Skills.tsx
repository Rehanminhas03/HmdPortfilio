"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_GROUPS, TOOLS } from "@/lib/data";

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barsRef, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.05 }}
          className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl"
        >
          Tools &amp; <em className="italic text-gold">Expertise</em>
        </motion.h2>

        <div ref={barsRef} className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Animated skill bars */}
          <div className="space-y-12">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-7 text-xs uppercase tracking-[0.3em] text-gold">
                  {group.title}
                </h3>
                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm text-white">{skill.name}</span>
                        <span className="font-cormorant text-base text-gold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-0.5 w-full bg-border">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-dim to-gold"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tools cloud */}
          <div>
            <h3 className="mb-7 text-xs uppercase tracking-[0.3em] text-gold">
              Tools &amp; Platforms
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="border border-border px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:border-gold hover:bg-gold/10 hover:text-white"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
