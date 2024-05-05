/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        background_sidebar: "var(--background-sidebar)",
        card: "var(--card)",
        text: "var(--text)",
        button_text: "var(--button-text)",
        button_text_inverted: "var(--button-text-inverted)",
        border: "var(--border)",
        border_b: "var(--border-b)",
        shadow: "var(--shadow)",
        hover_sidebar: "var(--hover-sidebar)",
      },
    },
  },
  plugins: [],
};
