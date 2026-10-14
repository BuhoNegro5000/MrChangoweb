import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: {
          950: "#040504",
          900: "#080A07",
          850: "#0E140F",
          800: "#141C16",
          700: "#1C2920",
          600: "#2A3D30",
        },
        reggae: {
          green: {
            deep: "#102419",
            forest: "#183827",
            leaf: "#245239",
            light: "#347954",
          },
          gold: {
            DEFAULT: "#DAB44A",
            light: "#E7C769",
            dark: "#B89433",
            amber: "#F2BE3A",
          },
          orange: {
            DEFAULT: "#C96832",
            deep: "#A94E1D",
            warm: "#DE7A42",
          },
          ivory: {
            DEFAULT: "#F1EADD",
            soft: "#FAF6EE",
            muted: "#C5BDB0",
            dark: "#8E877B",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Trebuchet MS", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
