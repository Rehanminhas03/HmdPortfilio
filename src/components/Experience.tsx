"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";

interface ExperienceProps {
  experience?: typeof EXPERIENCE;
}

export default function Experience({
  experience = EXPERIENCE,
}: ExperienceProps) {
  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          Experience
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.05 }}
          className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl"
        >
          Professional <em className="italic text-gold">Experience</em>
        </motion.h2>

        <div className="relative mt-16 ml-2 border-l border-gold/30">
          {experience.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pb-14 pl-10 last:pb-0"
            >
              <div className="absolute left-[-5px] top-[6px] h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_#C9A84C]" />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr] md:gap-8">
                <div className="text-xs uppercase tracking-[0.2em] text-gold">
                  <div>{exp.period}</div>
                  <div className="mt-1.5 text-muted">{exp.company}</div>
                </div>

                <div>
                  <h3 className="font-cormorant text-2xl font-light text-white">
                    {exp.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-2.5 py-1 text-[0.65rem] uppercase tracking-wide text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
