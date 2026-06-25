"use client";

import { motion } from "framer-motion";
import { CERTIFICATIONS, EDUCATION } from "@/lib/data";

interface EducationProps {
  education?: typeof EDUCATION;
  certifications?: string[];
}

export default function Education({
  education = EDUCATION,
  certifications = CERTIFICATIONS,
}: EducationProps) {
  return (
    <section id="education" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          Education
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.05 }}
          className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl"
        >
          Academic <em className="italic text-gold">Foundation</em>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-0.5 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border border-border bg-surface p-10 transition-colors hover:border-gold/50"
            >
              <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {edu.school}
              </span>
              <h3 className="mt-3 font-cormorant text-2xl font-light text-white">
                {edu.degree}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 mb-6 text-xs uppercase tracking-[0.3em] text-gold"
        >
          Certifications
        </motion.h3>
        <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 border border-border bg-surface p-4"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_#C9A84C]" />
              <span className="text-sm text-muted">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
