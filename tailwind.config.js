module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: "minmax(400px, 500px) 1fr",
      },
    },
    fontFamily: {
      serif: ["Georgia", "ui-serif", "Cambria", "Times New Roman"],
    },
  },
  plugins: [],
};
