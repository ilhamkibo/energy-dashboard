/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      nunito_sans: ["var(--font-nunito_sans)"],
    },
    colors: {
      color: {
        primary: "#201c44",
        white: "rgb(255, 255, 255)", // Perhatikan penggunaan koma di antara nilai RGB
        gray: "#8c8ba6", // Perhatikan penggunaan koma di antara nilai RGB
        greenBorder: "#84e4a4",
        bgPrime: "#1b1d50",
        bgSecond: "#226e91",
        bgCard: "rgba(29,27,65,.6)",
        dark: "#000",
      },
    },
  },
  plugins: [],
};
