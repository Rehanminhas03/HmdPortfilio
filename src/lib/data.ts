import type {
  Certification,
  Education,
  Experience,
  Project,
  Service,
  SkillGroup,
} from "./types";

/**
 * Your photo for the About section.
 * Drop the file at: public/images/profile/profile.jpg
 * Then set: export const PROFILE_IMAGE = "/images/profile/profile.jpg";
 * Leave as "" to keep the "Your Photo Here" placeholder.
 */
export const PROFILE_IMAGE = "";

export const EXPERIENCE: Experience[] = [
  {
    role: "Head of Media & Marketing",
    company: "Ittehad Steel — Pakistan",
    period: "2024 — Present",
    description:
      "Lead end-to-end marketing for one of Pakistan's largest steel manufacturers across B2B and B2C markets — content calendars, cinematic video production, and brand campaigns for the construction and engineering segments.",
    tags: ["Brand Strategy", "Cinematic Production", "B2B · B2C"],
  },
  {
    role: "Head of Media & Marketing",
    company: "Ittehad Automotive — Hyundai, Capital Smart Motors & Jetour",
    period: "2024 — Present",
    description:
      "Integrated marketing across three automotive brands — digital campaigns, vehicle launches, showroom lead generation, and EV awareness campaigns for Pakistan's emerging electric vehicle market.",
    tags: ["Automotive", "EV Marketing", "Lead Generation"],
  },
  {
    role: "AI Advertising & Creative Production Specialist",
    company: "Independent — International Clients",
    period: "2026 — Present",
    description:
      "AI-powered commercial videos, character-based ads, and product campaigns using Grok and Flow for international brands — combining creative storytelling with performance-driven advertising. Portfolio available on request.",
    tags: ["AI Production", "Grok", "Flow"],
  },
  {
    role: "Founder & Social Media Manager",
    company: "We Here to Serve — NGO",
    period: "2021 — 2026",
    description:
      "Founded and managed social media for a social impact NGO — growing donor engagement and community awareness through purpose-driven storytelling across Instagram and Facebook.",
    tags: ["Social Impact", "Community", "Storytelling"],
  },
  {
    role: "Social Media Manager",
    company: "Lumiskin by Zahra & Divine Nest — Aesthetics & Real Estate",
    period: "2023 — 2026",
    description:
      "Managed social media for a premium skincare clinic and a real estate company — visual-first content, property showcases, and educational posts aligned with premium brand positioning.",
    tags: ["Healthcare", "Real Estate", "Visual Content"],
  },
  {
    role: "Marketing Analytics Specialist & Marketing Manager",
    company: "Hill Pearl Amazon FBA & BuySmart E-Commerce",
    period: "2018 — 2025",
    description:
      "Digital marketing, paid ads, and Amazon FBA analytics — optimising listings, sponsored ads, and marketplace performance to drive measurable eCommerce growth.",
    tags: ["Amazon FBA", "Paid Ads", "Analytics"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "BBA in Marketing",
    school: "Bahria University Islamabad",
    description:
      "Foundation in marketing principles, brand management, consumer behaviour, and strategic communication — the bedrock of a data-informed creative practice.",
  },
  {
    degree: "Post-Graduate Certification in Entrepreneurship & Marketing",
    school: "LUMS — Lahore University of Management Sciences",
    description:
      "Advanced study in venture building, go-to-market strategy, and modern marketing leadership from one of South Asia's leading business schools.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  "Google Digital Garage",
  "HubSpot Academy — Marketing Certified",
  "Meta Blueprint — Advertising",
  "Coursera — Digital Marketing",
  "LinkedIn Learning — Marketing & Media",
  "Amazon FBA Marketing Analytics",
];

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Brand Strategy & Positioning",
    description:
      "Define a brand's voice, narrative, and market position — building distinctive identities that resonate across B2B and B2C audiences.",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "End-to-end social strategy — content calendars, community growth, and visual-first storytelling that turns followers into customers.",
  },
  {
    number: "03",
    title: "Cinematic Content & Video Production",
    description:
      "Photography, walkaround videos, and cinematic brand films — premium visual content shot and edited for maximum impact.",
  },
  {
    number: "04",
    title: "AI Advertising & Creative Production",
    description:
      "AI-powered commercials, character-based ads, and product campaigns using Grok and Flow — next-generation creative at scale.",
  },
  {
    number: "05",
    title: "Paid Media & Performance Marketing",
    description:
      "Meta Ads, sponsored campaigns, and full-funnel paid media engineered to generate leads and drive measurable ROI.",
  },
  {
    number: "06",
    title: "Marketing Analytics & Reporting",
    description:
      "Google Analytics, marketplace data, and campaign reporting — translating numbers into decisions that compound growth.",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Ittehad Steel — National Brand Campaign",
    category: "brand",
    categoryLabel: "Brand Strategy",
    description:
      "Full-funnel brand and content system for one of Pakistan's largest steel manufacturers, spanning B2B contractor and B2C audiences.",
    emoji: "🏗️",
    gradient: "from-[#1a2738] via-[#0e1420] to-[#080c12]",
    featured: true,
    // Drop file at public/images/projects/ittehad-steel.jpg then set the line below:
    image: "", // "/images/projects/ittehad-steel.jpg"
  },
  {
    title: "Hyundai Islamabad — Showroom Marketing",
    category: "automotive",
    categoryLabel: "Automotive",
    description:
      "Integrated digital campaigns, cinematic vehicle content, and showroom lead generation for a leading Hyundai dealership.",
    emoji: "🚗",
    gradient: "from-[#16263a] via-[#0e1420] to-[#080c12]",
    image: "", // "/images/projects/hyundai.jpg"
  },
  {
    title: "EV Launch — Capital Smart & Jetour",
    category: "automotive",
    categoryLabel: "Electric Vehicles",
    description:
      "Awareness and launch campaigns promoting electric vehicle adoption and sustainable mobility across Pakistan's EV market.",
    emoji: "⚡",
    gradient: "from-[#13302b] via-[#0e1420] to-[#080c12]",
    image: "", // "/images/projects/ev-launch.jpg"
  },
  {
    title: "AI Creative Production — International",
    category: "ai",
    categoryLabel: "AI Advertising",
    description:
      "AI-generated commercials, character-based ads, and product campaigns built with Grok and Flow for international brands.",
    emoji: "🤖",
    gradient: "from-[#2a2038] via-[#0e1420] to-[#080c12]",
    image: "", // "/images/projects/ai-production.jpg"
  },
  {
    title: "Divine Nest — Real Estate",
    category: "brand",
    categoryLabel: "Real Estate",
    description:
      "Property-focused social strategy and visual content that grew online presence and client engagement for a real estate brand.",
    emoji: "🏡",
    gradient: "from-[#332618] via-[#0e1420] to-[#080c12]",
    image: "", // "/images/projects/divine-nest.jpg"
  },
  {
    title: "We Here to Serve — NGO",
    category: "brand",
    categoryLabel: "Social Impact",
    description:
      "Purpose-driven storytelling and fundraising campaigns that amplified reach, donor engagement, and community awareness.",
    emoji: "🤝",
    gradient: "from-[#1c2c33] via-[#0e1420] to-[#080c12]",
    image: "", // "/images/projects/we-here-to-serve.jpg"
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Marketing",
    skills: [
      { name: "Brand Strategy & Positioning", level: 95 },
      { name: "Social Media Management", level: 95 },
      { name: "Paid Media & Performance", level: 90 },
      { name: "Marketing Analytics", level: 88 },
      { name: "SEO & Digital Marketing", level: 85 },
    ],
  },
  {
    title: "Creative",
    skills: [
      { name: "Cinematic Video Production", level: 92 },
      { name: "Photography & Videography", level: 90 },
      { name: "AI Creative Production", level: 88 },
      { name: "Graphic Design & Direction", level: 85 },
    ],
  },
];

export const TOOLS: string[] = [
  "Meta Ads",
  "DaVinci Resolve",
  "CapCut",
  "Filmora",
  "LumaFusion",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva",
  "HubSpot",
  "Google Analytics",
  "Grok AI",
  "Flow AI",
  "Amazon Seller Central",
  "Sprout Social",
  "Buffer",
  "Hootsuite",
  "Later",
  "Motion",
  "Google Business Suite",
];

export const INDUSTRIES: string[] = [
  "Steel & Manufacturing",
  "Automotive",
  "Electric Vehicles",
  "Real Estate",
  "Healthcare & Aesthetics",
  "eCommerce & Amazon FBA",
  "NGO & Social Impact",
  "AI Advertising",
  "International Brand Marketing",
];
