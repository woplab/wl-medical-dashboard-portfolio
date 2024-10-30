import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background : "#E5EEFF",
        pink       : "#FF7BAC",
        light_blue : "#8BACED",
        blue       : "#1A65F5",
        b_tr       : "#F3F7FF",
        black      : "#2C2C2C",
        white      : "#FFFFFF",
        gray       : "#A7A7A7",
        gray_light : "#EFEFEF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
