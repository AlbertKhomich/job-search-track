import { ThemeModeScript } from "flowbite-react";
import { Html, NextScript, Head, Main } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <ThemeModeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
