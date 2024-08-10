import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <title>IVES_HUB Chat</title>
                <meta name="description" content="Enter the Matrix with IVES_HUB Chat" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}