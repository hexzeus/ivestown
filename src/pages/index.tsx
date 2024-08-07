import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../app/styles/Home.module.css';
import MatrixIntro from '../app/components/BuffaloChat/MatrixIntro';

const BuffaloChatClient = dynamic(
    () => import('../app/components/BuffaloChat/BuffaloChatClient'),
    { ssr: false }
);

export default function Home() {
    const [showIntro, setShowIntro] = useState(true);

    const handleIntroComplete = () => {
        setShowIntro(false);
    };

    if (showIntro) {
        return <MatrixIntro onComplete={handleIntroComplete} />;
    }

    return (
        <div className={styles.container}>
            <BuffaloChatClient />
        </div>
    );
}