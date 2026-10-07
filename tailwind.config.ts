import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lux: {
          black: "#0b0a09",
          obsidian: "#12100e",
          charcoal: "#1c1917",
          stone: "#292524",
          surface: "#181614",
          border: "#332d26",
          bronze: {
            light: "#b89569",
            DEFAULT: "#8c6d46",
            dark: "#5c4426",
          },
          gold: {
            100: "#fdf8ec",
            200: "#f7e8c3",
            300: "#e9cf8b",
            400: "#dfba73",
            DEFAULT: "#c5a059",
            dark: "#99732d",
            glow: "rgba(197, 160, 89, 0.25)",
          },
          ivory: {
            50: "#faf9f5",
            100: "#f5f2ea",
            200: "#eae4d5",
            DEFAULT: "#f7f4ed",
            muted: "#c8c1b3",
          },
          champagne: "#e6d5b8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Manrope", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.18)",
        "gold-subtle": "0 4px 20px rgba(197, 160, 89, 0.08)",
        "luxury-deep": "0 20px 50px -10px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
