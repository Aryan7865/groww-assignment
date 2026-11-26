/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // page (outside phone) + app chrome
        canvas:   "#E7ECE4",
        // in-phone background (warm off-white)
        app:      "#F6F7F2",
        card:     "#FFFFFF",
        ink:      "#0E1511",
        muted:    "#6B7367",
        hairline: "rgba(14,21,17,0.06)",
        // sage + lime
        sage: {
          50:  "#F1F5EE",
          100: "#E4ECE0",
          200: "#CBDAC4",
          300: "#A9C29E",
          500: "#6E9663",
          700: "#39543B",
          900: "#1F3B29",
        },
        lime: {
          200: "#E8F7B5",
          400: "#C5F26A",
          500: "#B5E85A",
          600: "#9BD23F",
        },
        warn: {
          50: "#FFF6E5",
          600: "#C27A08",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Instrument Serif'", "Inter", "serif"],
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "30px",
      },
      boxShadow: {
        cardsm: "0 1px 2px rgba(14,21,17,0.04)",
        card:   "0 1px 2px rgba(14,21,17,0.04), 0 2px 10px rgba(14,21,17,0.04)",
        float:  "0 8px 32px -12px rgba(31,59,41,0.22)",
        phone:  "0 30px 80px -30px rgba(14,21,17,0.35), 0 8px 24px -10px rgba(14,21,17,0.18)",
      },
      letterSpacing: {
        tightish: "-0.015em",
        tighter2: "-0.025em",
      },
    },
  },
  plugins: [],
};
