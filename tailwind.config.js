/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xs: "1600px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        montserratMedium: ["Montserrat-Medium", "sans-serif"],
        montserratBold: ["Montserrat-Bold", "sans-serif"],
      },
      keyframes: {
        zoomIn: {
          "0%, 50%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.75)", opacity: "0" },
        },
      },
      animation: {
        "zoom-in-3s": "zoomIn 3s ease-in-out",
      },
      colors: {
        primary: "#3ac882",
      },
      borderColor: {
        primary: "#3ac882",
      },
      backgroundColor: {
        primary: "#3ac882",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
