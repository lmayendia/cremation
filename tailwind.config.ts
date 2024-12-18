import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'stain-move': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(15px, 10px) scale(1.05)' },
          '100%': { transform: 'translate(-10px, -15px) scale(0.95)' },
        },
      },
      colors: {
        primary: {
          100: "#CCE4FF", // Lightest variant
          200: "#99C9FF",
          300: "#66AFFF",
          400: "#3394FF", // Lighter variant
          500: "#135CB3", // Main primary color           500: "#1E90FF", // Main primary color
          600: "#1A82E6",
          700: "#176FCC",
          800: "#135CB3",
          900: "#10499A", // Darker variant
        },
        secondary: {
          100: "#E3F2FD",
          200: "#BBDEFB",
          300: "#90CAF9",
          400: "#64B5F6", // Lighter variant
          500: "#1A73E8", // Main secondary color
          600: "#1976D2",
          700: "#1565C0",
          800: "#0D47A1",
          900: "#0B3E90", // Darker variant
        },
      },
    },
  },
  plugins: [],
};
export default config;
