import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            const enableFullscreen = () => {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch((err) => {
                        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else if ((document.documentElement as any).webkitRequestFullscreen) { // Safari
                    (document.documentElement as any).webkitRequestFullscreen();
                }
            };

            const disableFullscreen = () => {
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch((err) => {
                        console.warn(`Error attempting to exit fullscreen: ${err.message}`);
                    });
                } else if ((document as any).webkitExitFullscreen) { // Safari
                    (document as any).webkitExitFullscreen();
                }
            };

            const handleVisibilityChange = () => {
                if (document.hidden) {
                    disableFullscreen();
                } else {
                    enableFullscreen();
                }
            };

            // Attempt to enable fullscreen on first interaction
            const handleFirstInteraction = () => {
                enableFullscreen();
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('click', handleFirstInteraction);
            };

            document.addEventListener('touchstart', handleFirstInteraction);
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        }
    }, [isMobile]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <title>IVES_HUB Chat</title>
                <meta name="description" content="Enter the Matrix with IVES_HUB Chat" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}