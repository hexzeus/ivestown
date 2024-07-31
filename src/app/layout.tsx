// app/layout.tsx
'use client';
import { Global, css } from '@emotion/react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Global
        styles={css`
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: ${montserrat.style.fontFamily};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #000000;
            color: #ffffff;
            overflow-x: hidden;
          }

          ::selection {
            background: rgba(255, 215, 0, 0.3);
          }
        `}
      />
      <body>{children}</body>
    </html>
  );
}