import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'

export default class _document extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="UTF-8"/>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
          <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
          <link rel="shortcut icon" href="/favicon.png" type="image/png"></link>
          <title>StudentsPay</title>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
