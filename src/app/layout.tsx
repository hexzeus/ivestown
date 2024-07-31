// app/layout.tsx
'use client';
import { Global, css } from '@emotion/react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Global
        styles={css`
          body {
            font-family: ${montserrat.style.fontFamily};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #171717;
            color: #d4d4d4;
          }
        `}
      />
      <body>{children}</body>
    </html>
  );
}