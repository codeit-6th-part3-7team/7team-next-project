import "@/src/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import type { AppProps } from "next/app";

const theme = createTheme({
  fontFamily: "Pretendard, sans-serif",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
