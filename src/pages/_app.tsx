import React from "react";
import Head from "next/head";

import "@/styles/global.scss";

class App extends React.Component<{ Component: React.ComponentType<any>, pageProps: any }> {
  public render = () => {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="Atla" content="Calgary Hacks 2024 Web App" />
          <link rel="icon" href="/atla-logo-small.svg" />
          <title>Atla</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default App;