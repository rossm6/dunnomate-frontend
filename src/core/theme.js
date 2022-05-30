const breakpoints = ["640px", "960px", "1280px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];

export const theme = {
  colors: {
    // Colors
    dark: "#1a1a1a",
    nygreen: "#B5E352",
    green: "#00bf86",
    purple: "#4b2ed4",
    red: "#e34b4b",
    orange: "#fb9b00",
    anagramTileOrange: "#fb9b00",
    blue: "#4d88f9",
    gameOverRed: "#d62e26",
    yellow: "rgb(247, 218, 33)", // new york times spelling bee yellow color

    // Greys
    haze: "#f2f2f2",
    cloud: "#ddd",
    carbon: "#ccc",
    slate: "#999",
    charcoal: "#777",
    lightGrey: "#edeef0",
  },
  //      0  1  2   3   4   5   6   7   8   9    10
  space: [0, 5, 10, 15, 20, 30, 40, 60, 80, 120, 160],
  breakpoints,
  fonts: {
    dinBold: "DINNextW01-CondensedMed",
    gilroyMedium: "Gilroy W05 Medium",
    gilroyBold: "Gilroy W05 Bold",
  },
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints.sm})`,
    medium: `@media screen and (min-width: ${breakpoints.md})`,
    large: `@media screen and (min-width: ${breakpoints.lg})`,
  },
  spacing: {
    extraLarge: [40, 60, 80, 100],
    large: [40, 40, 60, 80],
    medium: [20, 20, 30, 40],
    small: ["10px", "10px", 15, 20],
  },
};