import { createTheme, MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  colors: {
    gray: ["#F7F7FA", "#E4E5F0", "#C6CADA", "#8F95B2", "#474D66", "#3B415B", "#3B415B", "#3B415B", "#3B415B", "#3B415B"],
    green: ["#EEF9F6", "#4CBFA4", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A"],
    red: ["#FBEDED", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343"],
    purple: ["#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF"],
    yellow: ["#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181"],
  },
};

export default createTheme(theme);
