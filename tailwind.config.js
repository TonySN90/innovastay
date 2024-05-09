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
        active: "var(--active)",
        status_green: "var(--status-green)",
        status_yellow: "var(--status-yellow)",
        status_red: "var(--status-red)",
        status_blue: "var(--status-blue)",
        status_gray: "var(--status-gray)",
        db_arrival_icon: "var(--db-arrival-icon)",
        db_departure_icon: "var(--db-departure-icon)",
        db_presentGuests_icon: "var(--db-presentGuests-icon)",
        db_infobox: "var(--db-infobox)",
        input_disabled: "var(--input-disabled)",
        timetable_weekend_bg: "var(--timetable-weekend-bg)",
      },
    },
  },
  plugins: [],
};
