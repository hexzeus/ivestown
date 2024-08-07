import dynamic from 'next/dynamic';

const BuffaloChatClient = dynamic(
    () => import('../app/components/BuffaloChat/BuffaloChatClient'),
    { ssr: false }
);

export default function Home() {
    return (
        <div>
            <h1>IVES_HUB Chat</h1>
            <BuffaloChatClient />
        </div>
    );
}
