module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: "minmax(400px, 500px) 1fr",
        posts: "minmax(400px, 1fr) minmax(200px, 300px)",
      },
      boxShadow: {
        neu: "6px 6px 14px 0 rgba(0, 0, 0, 0.1), -8px -8px 18px 0 rgba(255, 255, 255, 0.35)",
      },
    },
    fontFamily: {
      serif: ["Georgia", "ui-serif", "Cambria", "Times New Roman"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
