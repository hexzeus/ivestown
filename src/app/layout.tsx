'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <header className="bg-background py-4">
          <nav className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary neon-text">
                IVES_DEV
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-6 matrix-border">
          {children}
        </main>
        <footer className="bg-background py-4 text-center matrix-border">
          <p>&copy; 2023 SuperUltra Dark Goth Matrix Theme. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
