import { MantineProvider } from "@mantine/core";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
