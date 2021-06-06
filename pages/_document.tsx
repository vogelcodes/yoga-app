import Document, { Html , Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
    render() {
        return(
        <Html>
            <Head>
        <link rel="icon" href="/lotus-yoga.svg" />

            </Head>
        <body>
            
            <Main></Main>
            <NextScript />
        </body>
        </Html>
        )
    }
}