import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;800&family=Overpass:wght@400;600;700&display=swap"
          />
        </Head>
        <body style={{ overflowX: "hidden",width:"100vw" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
