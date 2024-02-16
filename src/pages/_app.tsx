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
          <meta name="CalgaryHacks2024" content="Who knows..." />
          <title>CalgaryHacks2024</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default App;