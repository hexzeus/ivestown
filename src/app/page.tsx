import dynamic from 'next/dynamic';

const BuffaloChatClient = dynamic(() => import('./BuffaloChatClient'), {
    ssr: false,
});

export default function Home() {
    return <BuffaloChatClient />;
}