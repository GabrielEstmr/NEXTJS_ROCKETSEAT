import Document, { Html, Head, Main, NextScript } from 'next/document';

//APP => tudo o que repete
//DOcument => IGUAL INDEX>HTML react => o que nao repete
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />

                    <link rel="shortcut icon" href="favicon.png" type="image/png"></link>

                    <title>IGNews</title>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}