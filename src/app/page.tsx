import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getCertifications,
  getEducation,
  getExperience,
  getIndustries,
  getProfileImage,
  getProjects,
  getServices,
  getSkillGroups,
  getTools,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    projects,
    experience,
    services,
    skillGroups,
    education,
    certifications,
    tools,
    industries,
    profileImage,
  ] = await Promise.all([
    getProjects(),
    getExperience(),
    getServices(),
    getSkillGroups(),
    getEducation(),
    getCertifications(),
    getTools(),
    getIndustries(),
    getProfileImage(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About industries={industries} profileImage={profileImage} />
        <Work projects={projects} />
        <Services services={services} />
        <Skills skillGroups={skillGroups} tools={tools} />
        <Experience experience={experience} />
        <Education education={education} certifications={certifications} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
