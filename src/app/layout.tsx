// app/layout.tsx
'use client';
import './globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}