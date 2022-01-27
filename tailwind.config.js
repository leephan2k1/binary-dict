module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#f4f4f4",
        secondary: {
          100: "#f6f8fa",
          200: "#e5e5e5",
        },
      },
      fontFamily: {
        logo: ["'Press Start 2P', cursive"],
        body: ["'Nunito', sans-serif"],
      },

      listStyleType: {
        circle: "circle",
      },
      scrollbar: {
        "scrollbar-thumb-rounded": ["rounded-2xl"],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
