/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background_primary: "var(--background-primary)",
        background_secondary: "var(--background-secondary)",
        card: "var(--card)",
        text: "var(--text)",
        button_text: "var(--button-text)",
        button_text_inverted: "var(--button-text-inverted)",
        border: "var(--border)",
        border_b: "var(--border-b)",
        border_modal: "var(--border-modal)",
        shadow: "var(--shadow)",
        hover_sidebar: "var(--hover-sidebar)",
        menu: "var(--menu)",
        table_header: "var(--table-header)",
        filterButtons_border: "var(--filterButtons-border)",
        filterButton_active: "var(--filterButton-active)",
      },
    },
  },
  plugins: [],
};
