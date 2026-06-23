import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#080C12",
        surface: "#0E1420",
        border: "#1E2535",
        gold: "#C9A84C",
        "gold-dim": "#8A6E2F",
        white: "#F0EDE6",
        muted: "#8A8F9A",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 18px 4px rgba(201, 168, 76, 0.55)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        pulse: "pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
