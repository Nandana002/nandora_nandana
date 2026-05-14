import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deeper black
        foreground: "#fafafa", // Cleaner white
        charcoal: {
          DEFAULT: "#0f0f0f",
          light: "#1a1a1a",
          dark: "#050505",
        },
        crimson: {
          DEFAULT: "#8b0000",
          light: "#b22222",
          dark: "#4a0000",
          glow: "rgba(139, 0, 0, 0.5)",
        },
        gold: {
          DEFAULT: "#c5a059", // More muted, premium gold
          light: "#e5c05b",
          dark: "#8e6d2f",
          glow: "rgba(197, 160, 89, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      spacing: {
        "section": "10rem",
        "container": "8rem",
      },
      boxShadow: {
        "premium": "0 20px 50px rgba(0, 0, 0, 0.5)",
        "glow-crimson": "0 0 30px rgba(139, 0, 0, 0.3)",
        "glow-gold": "0 0 30px rgba(197, 160, 89, 0.2)",
        "glass": "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        "3xl": "2rem",
        "4xl": "3rem",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(2deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "noise-texture": "url('https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671234/noise_texture_p8r9y8.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
