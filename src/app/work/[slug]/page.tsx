import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

function isVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(url);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project — Hammad Ayub" };
  return {
    title: `${project.title} — Hammad Ayub`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const media = project.media ?? [];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="px-6 pb-24 pt-32 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#work"
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
            >
              ← Back to work
            </Link>

            <header className="mt-8 border-b border-border pb-12">
              <span className="text-xs uppercase tracking-[0.35em] text-gold">
                {project.categoryLabel}
              </span>
              <h1 className="mt-4 max-w-4xl font-cormorant text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                {project.description}
              </p>
            </header>

            {/* Cover */}
            {project.image && (
              <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  priority
                />
              </div>
            )}

            {/* Gallery */}
            {media.length > 0 ? (
              <section className="mt-12">
                <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
                  The Work
                </h2>
                <div className="columns-1 gap-4 sm:columns-2">
                  {media.map((item, i) => {
                    const w = item.width ?? 0;
                    const h = item.height ?? 0;
                    const natural = w > 0 && h > 0;
                    const video = isVideo(item.url);
                    return (
                      <figure
                        key={`${item.url}-${i}`}
                        className="mb-4 overflow-hidden border border-border bg-surface [break-inside:avoid]"
                      >
                        {natural ? (
                          video ? (
                            <video
                              width={w}
                              height={h}
                              controls
                              preload="metadata"
                              playsInline
                              className="block h-auto w-full"
                            >
                              <source src={item.url} />
                              Your browser does not support video playback.
                            </video>
                          ) : (
                            <Image
                              src={item.url}
                              alt={item.caption || project.title}
                              width={w}
                              height={h}
                              className="h-auto w-full"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                          )
                        ) : (
                          <div className="relative aspect-[16/10] bg-obsidian">
                            {video ? (
                              <video
                                controls
                                preload="metadata"
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover"
                              >
                                <source src={item.url} />
                                Your browser does not support video playback.
                              </video>
                            ) : (
                              <Image
                                src={item.url}
                                alt={item.caption || project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            )}
                          </div>
                        )}
                        {item.caption && (
                          <figcaption className="px-4 py-3 text-xs tracking-wide text-muted">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  })}
                </div>
              </section>
            ) : (
              !project.image && (
                <div className="mt-12 flex aspect-[16/7] items-center justify-center border border-border bg-surface">
                  <span className="text-7xl opacity-70">{project.emoji}</span>
                </div>
              )
            )}

            {/* CTA */}
            <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-12">
              <p className="font-cormorant text-2xl font-light text-white">
                Like what you see?
              </p>
              <Link
                href="/#contact"
                className="bg-gold px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c]"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
