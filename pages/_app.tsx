<<<<<<< HEAD
import Header from "@/src/components/Header";
import "@/src/styles/globals.css";
import theme from "@/src/styles/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
=======
import "@/src/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
>>>>>>> 65715ca (feat: 에디터 초안 작성)
import type { AppProps } from "next/app";
import theme from "@/src/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
<<<<<<< HEAD
      <Notifications position="top-right" />
      <Header />
=======
>>>>>>> 65715ca (feat: 에디터 초안 작성)
      <Component {...pageProps} />
    </MantineProvider>
  );
}
