import React, { useState, useEffect } from 'react';
import styles from './MatrixIntro.module.css';

const MatrixIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [text, setText] = useState('');
    const fullText = "Prepare to enter the IVES_HUB Chat.";
    const [showEnterButton, setShowEnterButton] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowEnterButton(true), 1000);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.introContainer}>
            <div className={styles.matrixBackground}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>IVES_HUB Chat</h1>
                <div className={styles.textContainer}>
                    <p className={styles.typingText}>{text}</p>
                </div>
                {showEnterButton && (
                    <button className={styles.enterButton} onClick={onComplete}>
                        Enter the Matrix
                    </button>
                )}
            </div>
        </div>
    );
};

export default MatrixIntro;
