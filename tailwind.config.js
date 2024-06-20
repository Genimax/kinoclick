/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image":
          "url('https://www.funnyart.club/uploads/posts/2022-10/1666319881_6-www-funnyart-club-p-kinozal-kartinki-krasivo-7.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
