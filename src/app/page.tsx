// pages/index.tsx
import React from 'react';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 sm:px-8 md:px-12 lg:px-16">
            <main className="flex-grow w-full max-w-2xl matrix-border">
                <section className="mb-20">
                    <h2 className="section-title neon-text fadeInUp">IVES_DEV</h2>
                    <p className="text-foreground text-lg mb-12 fadeInUp" style={{ animationDelay: '0.5s' }}>
                        Cutting-edge web development services. Specializing in React and Native.js.
                    </p>
                </section>
                <section className="mb-20">
                    <h2 className="section-title neon-text fadeInUp">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 fadeInUp" style={{ animationDelay: '0.5s' }}>
                        <div className="bg-background p-6 rounded-lg matrix-border">
                            <h3 className="text-2xl font-bold mb-4 text-green-400 neon-text">React Development</h3>
                            <p className="text-foreground mb-6">
                                Scalable and efficient web applications with seamless user experiences.
                            </p>
                            <a href="#" className="btn-primary">Learn More</a>
                        </div>
                        <div className="bg-background p-6 rounded-lg matrix-border">
                            <h3 className="text-2xl font-bold mb-4 text-green-400 neon-text">Native.js Development</h3>
                            <p className="text-foreground mb-6">
                                High-performance mobile apps for iOS and Android platforms.
                            </p>
                            <a href="#" className="btn-primary">Learn More</a>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-background py-4 text-center matrix-border w-full max-w-2xl">
                <p>&copy; 2024 IVES_DEV. All rights reserved.</p>
            </footer>
        </div>
    );
}