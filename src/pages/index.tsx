import dynamic from 'next/dynamic';
import styles from '../app/styles/Home.module.css';

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