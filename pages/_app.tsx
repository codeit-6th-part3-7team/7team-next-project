import { MantineProvider } from "@mantine/core";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/src/components/Header";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
