module.exports = {
  purge: [
    './src/**/*.js',
  ],
  theme: {
    extend: {
      spacing: {
        "28": "7rem",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "14/25": "56%",
      },
      fontFamily: {
        serif: [
          "EB Garamond",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        sans: [
          "Jost",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    gradients: (theme) => ({
      // Array definition (defaults to linear gradients).
      topaz: ["30deg", theme("colors.orange.500"), theme("colors.pink.400")],
      "topaz-dark": [
        "30deg",
        theme("colors.orange.700"),
        theme("colors.pink.600"),
      ],
      emerald: [
        "to right",
        theme("colors.green.400"),
        theme("colors.teal.500"),
      ],
      fireopal: ["to right", "#40E0D0", "#FF8C00", "#FF0080"],
      relay: ["to top left", "#3A1C71", "#D76D77", "#FFAF7B"],
      "green-blue": ["30deg", "#89B4AD", "#416788"],

      // Object definition.
      "mono-circle": {
        type: "radial",
        colors: ["circle", "#CCC", "#000"],
      },
    }),
    typography: {
      default: {
        css: {
          noprose: false,
        },
      },
    },
  },
  variants: {
    gradients: ["responsive", "hover"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-plugins/gradients"),
  ],
};
