import type { Config } from "tailwindcss";

/**
 * Tailwind theme derived directly from the Hashmi logo:
 * a grey ("HAS") → purple ("HMI") diagonal gradient on near-black.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds / surfaces (light theme)
        base: "#F7F7FB", // off-white page background
        surface: "#EFEEF5", // subtle grey for alternating sections
        card: "#FFFFFF", // card background
        border: "#E5E3EC", // hairline borders

        // Brand purples
        primary: {
          DEFAULT: "#7C3AED", // primary purple
          deep: "#4C1D95", // deep purple
          // On a light theme the "light" accent must stay legible, so it is
          // a deeper violet (used for accent text, icons, focus rings).
          light: "#6D28D9",
        },

        // Logo silver-grey ("HAS")
        silver: "#9CA3AF",

        // Text
        ink: "#17151F", // primary text (near-black)
        muted: "#56545F", // secondary text
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Signature grey → purple diagonal accent
        "chevron-gradient":
          "linear-gradient(135deg, #9CA3AF 0%, #7C3AED 100%)",
        "purple-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0) 70%)",
        "mesh-hero":
          "radial-gradient(40% 50% at 20% 10%, rgba(124,58,237,0.14) 0%, rgba(247,247,251,0) 60%), radial-gradient(45% 55% at 85% 20%, rgba(167,139,250,0.16) 0%, rgba(247,247,251,0) 55%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,58,237,0.18), 0 18px 50px -20px rgba(124,58,237,0.35)",
        card: "0 12px 36px -16px rgba(23,21,31,0.16)",
      },
      letterSpacing: {
        brand: "0.08em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
