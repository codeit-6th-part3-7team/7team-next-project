import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@/src/styles/globals.css";
import "@mantine/core/styles.css";
import theme from "@/src/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
