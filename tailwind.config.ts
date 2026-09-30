import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0E2A5C",
          dark: "#081A3B",
        },
        gold: {
          DEFAULT: "#C79A3E",
        },
        success: {
          DEFAULT: "#0E7A4F",
        },
        surface: {
          DEFAULT: "#F5F7FA",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)"],
        sans: ["var(--font-ibm-plex-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
