import { createTheme, MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  colors: {
    gray: ["#F7F7FA", "#E4E5F0", "#C6CADA", "#8F95B2", "#474D66", "#3B415B", "#3B415B", "#3B415B", "#3B415B", "#3B415B"],
    green: ["#EEF9F6", "#4CBFA4", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A", "#32A68A"],
    red: ["#FBEDED", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343", "#D14343"],
    purple: ["#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF", "#8E66FF"],
    yellow: ["#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181", "#FDD181"],
  },
  fontFamily: "Pretendard, sans-serif",
};
// note  mantine theme 색상 배열타입 기본 길이가 10으로 설정되어 있어서 사용하는 색상 외에는 임의로 채워넣었습니다..

export default createTheme(theme);
