'use client';
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './BuffaloChat.module.css';

interface ChatMessage {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
}

export default function BuffaloChatClient() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [userId, setUserId] = useState<string>('');
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initSocket = async () => {
            try {
                await fetch('/api/socket');
                const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || '';
                const newSocket = io(socketUrl, {
                    path: '/api/socket_io',
                });
                setSocket(newSocket);
                newSocket.on('connect', () => {
                    console.log('Connected to server');
                    setUserId(newSocket.id || `user-${Math.random().toString(36).substr(2, 9)}`);
                });
                newSocket.on('chat message', (message: ChatMessage) => {
                    console.log('Received message:', message);
                    setMessages(prevMessages => {
                        if (!prevMessages.some(m => m.id === message.id)) {
                            return [...prevMessages, message];
                        }
                        return prevMessages;
                    });
                });
            } catch (error) {
                console.error('Failed to initialize socket:', error);
            }
        };
        initSocket();
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() && socket) {
            const newMessage: ChatMessage = {
                id: `${userId}-${Date.now()}`,
                userId,
                text: inputMessage,
                timestamp: Date.now(),
            };
            console.log('Sending message:', newMessage);
            socket.emit('chat message', newMessage);
            setInputMessage('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>Buffalo Chat</h1>
            <div className={styles.chatContainer}>
                <div className={styles.messageList} ref={messageListRef}>
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${message.userId === userId ? styles.currentUserMessage : styles.otherUserMessage
                                }`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <input
                    className={styles.input}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button className={styles.button} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}