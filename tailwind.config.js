module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#f4f4f4",
        secondary: {
          100: "#e5e5e5",
          200: "#b2b2b2",
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
