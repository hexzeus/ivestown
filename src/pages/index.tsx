import dynamic from 'next/dynamic';
import styles from '../app/styles/Home.module.css'; // Correct import statement

const BuffaloChatClient = dynamic(
    () => import('../app/components/BuffaloChat/BuffaloChatClient'),
    { ssr: false }
);

export default function Home() {
    return (
        <div className={styles.container}>
            <BuffaloChatClient />
        </div>
    );
}
