<<<<<<< HEAD
import Header from "@/src/components/Header";
import "@/src/styles/globals.css";
import theme from "@/src/styles/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
=======
import "@/src/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
>>>>>>> feat/KAN-50
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";
import theme from "@/src/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
<<<<<<< HEAD
      <Header />
=======
>>>>>>> feat/KAN-50
      <Component {...pageProps} />
    </MantineProvider>
  );
}
