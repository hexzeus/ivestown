'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
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

    const addMessage = useCallback((message: ChatMessage) => {
        setMessages((prevMessages) => {
            if (!prevMessages.some(m => m.id === message.id)) {
                return [...prevMessages, message];
            }
            return prevMessages;
        });
    }, []);

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
        const newSocket = io(socketUrl);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            setUserId(newSocket.id || `user-${Math.random().toString(36).substr(2, 9)}`);
        });

        newSocket.on('chat message', (message: ChatMessage) => {
            console.log('Received message:', message);
            addMessage(message);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [addMessage]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = useCallback(() => {
        if (inputMessage.trim() && socket) {
            const newMessage: ChatMessage = {
                id: `${userId}-${Date.now()}`,
                userId,
                text: inputMessage,
                timestamp: Date.now(),
            };
            console.log('Sending message:', newMessage);
            socket.emit('chat message', newMessage);
            addMessage(newMessage);
            setInputMessage('');
        }
    }, [inputMessage, socket, userId, addMessage]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }, [sendMessage]);

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>IVES_HUB Chat</h1>
            <div className={styles.chatContainer}>
                <div className={styles.messageList} ref={messageListRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${message.userId === userId ? styles.currentUserMessage : styles.otherUserMessage
                                }`}
                        >
                            <span className={styles.messageText}>{message.text}</span>
                            <span className={styles.messageTime}>
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter the Matrix..."
                    />
                    <button className={styles.button} onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}