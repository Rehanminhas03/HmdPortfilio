export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "tags"
  | "image"
  | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  /** Static options for a select field. */
  options?: { value: string; label: string }[];
  /** Load select options from another table (value = id, label = labelColumn). */
  optionsFrom?: { table: string; labelColumn: string };
  placeholder?: string;
  help?: string;
  required?: boolean;
  /** Stored in the row but not shown in the form (e.g. auto-captured dimensions). */
  hidden?: boolean;
}

export interface ResourceConfig {
  slug: string;
  table: string;
  /** Plural label shown in the sidebar and headings. */
  title: string;
  /** Singular label used in buttons ("Add Project"). */
  singular: string;
  /** Row field shown as the primary label in the list. */
  labelField: string;
  /** Optional secondary line in the list. */
  subLabelField?: string;
  /** Optional image field surfaced as a thumbnail in the list. */
  imageField?: string;
  fields: FieldConfig[];
}

const GRADIENT_HELP =
  "Tailwind gradient classes used when no image is set. Default works fine — e.g. from-[#16263a] via-[#0e1420] to-[#080c12]";

export const RESOURCES: ResourceConfig[] = [
  {
    slug: "projects",
    table: "projects",
    title: "Projects",
    singular: "Project",
    labelField: "title",
    subLabelField: "category_label",
    imageField: "image_url",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category (filter group)",
        type: "select",
        options: [
          { value: "brand", label: "Brand" },
          { value: "automotive", label: "Automotive" },
          { value: "ai", label: "AI" },
        ],
      },
      {
        name: "category_label",
        label: "Category label (shown on card)",
        type: "text",
        placeholder: "e.g. Brand Strategy",
      },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "image_url",
        label: "Project image",
        type: "image",
        help: "Upload a photo for the card. Leave empty to use the gradient + emoji.",
      },
      {
        name: "emoji",
        label: "Emoji (fallback when no image)",
        type: "text",
        placeholder: "🏗️",
      },
      { name: "gradient", label: "Gradient classes", type: "text", help: GRADIENT_HELP },
      { name: "featured", label: "Featured (wider card)", type: "boolean" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "campaign-media",
    table: "project_media",
    title: "Campaign Media",
    singular: "Media item",
    labelField: "caption",
    subLabelField: "project_id",
    imageField: "url",
    fields: [
      {
        name: "project_id",
        label: "Campaign / project",
        type: "select",
        optionsFrom: { table: "projects", labelColumn: "title" },
        required: true,
      },
      {
        name: "url",
        label: "Image or video",
        type: "file",
        help: "Upload a photo or a short video clip of the work for this campaign.",
      },
      { name: "caption", label: "Caption (optional)", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
      // Auto-captured from the uploaded file; used to show true aspect ratio.
      { name: "width", label: "Width", type: "number", hidden: true },
      { name: "height", label: "Height", type: "number", hidden: true },
    ],
  },
  {
    slug: "experience",
    table: "experiences",
    title: "Experience",
    singular: "Role",
    labelField: "role",
    subLabelField: "company",
    fields: [
      { name: "role", label: "Role / title", type: "text", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "period", label: "Period", type: "text", placeholder: "2024 — Present" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "tags",
        label: "Tags",
        type: "tags",
        help: "One per line (or comma-separated).",
      },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "services",
    table: "services",
    title: "Services",
    singular: "Service",
    labelField: "title",
    subLabelField: "number",
    fields: [
      { name: "number", label: "Number", type: "text", placeholder: "01" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "skill-groups",
    table: "skill_groups",
    title: "Skill Groups",
    singular: "Group",
    labelField: "title",
    fields: [
      { name: "title", label: "Group title", type: "text", required: true },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "skills",
    table: "skills",
    title: "Skills",
    singular: "Skill",
    labelField: "name",
    fields: [
      {
        name: "group_id",
        label: "Group",
        type: "select",
        optionsFrom: { table: "skill_groups", labelColumn: "title" },
        required: true,
      },
      { name: "name", label: "Skill name", type: "text", required: true },
      {
        name: "level",
        label: "Level (0–100)",
        type: "number",
        help: "Drives the progress bar width.",
      },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "education",
    table: "education",
    title: "Education",
    singular: "Qualification",
    labelField: "degree",
    subLabelField: "school",
    fields: [
      { name: "degree", label: "Degree / qualification", type: "text", required: true },
      { name: "school", label: "School / institution", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "certifications",
    table: "certifications",
    title: "Certifications",
    singular: "Certification",
    labelField: "name",
    fields: [
      { name: "name", label: "Certification", type: "text", required: true },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "tools",
    table: "tools",
    title: "Tools",
    singular: "Tool",
    labelField: "name",
    fields: [
      { name: "name", label: "Tool / platform", type: "text", required: true },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  {
    slug: "industries",
    table: "industries",
    title: "Industries",
    singular: "Industry",
    labelField: "name",
    fields: [
      { name: "name", label: "Industry", type: "text", required: true },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
];

export function getResource(slug: string): ResourceConfig | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
