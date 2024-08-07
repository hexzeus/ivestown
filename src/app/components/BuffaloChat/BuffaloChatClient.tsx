import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './BuffaloChat.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from '../MatrixRain';

interface ChatMessage {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
}

interface User {
    id: string;
    username: string;
}

export default function BuffaloChatClient() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const messageListRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        });

        newSocket.on('userId', (id: string) => {
            setUserId(id);
            setIsJoined(true);
        });

        newSocket.on('chat message', (message: ChatMessage) => {
            console.log('Received message:', message);
            addMessage(message);
        });

        newSocket.on('userList', (users: User[]) => {
            setActiveUsers(users);
        });

        newSocket.on('userTyping', ({ userId, isTyping }) => {
            setTypingUsers(prev => {
                const newTypingUsers = new Set(prev);
                if (isTyping) {
                    newTypingUsers.add(userId);
                } else {
                    newTypingUsers.delete(userId);
                }
                return Array.from(newTypingUsers);
            });
        });

        newSocket.on('systemMessage', (message: { text: string }) => {
            addMessage({
                id: `system-${Date.now()}`,
                userId: 'system',
                text: message.text,
                timestamp: Date.now(),
            });
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
            setInputMessage('');
        }
    }, [inputMessage, socket, userId]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }, [sendMessage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
        if (socket) {
            socket.emit('typing', { userId, isTyping: true });
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('typing', { userId, isTyping: false });
            }, 2000);
        }
    };

    const handleJoin = () => {
        if (username.trim() && socket) {
            socket.emit('join', username);
        }
    };

    const renderJoinScreen = () => (
        <div className={styles.joinContainer}>
            <div className={styles.matrixRainContainer}>
                <MatrixRain />
            </div>
            <h1 className={styles.logo}>IVES_HUB Chat</h1>
            <input
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <button className={styles.button} onClick={handleJoin}>
                Join Chat
            </button>
        </div>
    );

    const renderChatInterface = () => (
        <div className={styles.container}>
            <div className={styles.matrixRainContainer}>
                <MatrixRain />
            </div>
            <h1 className={styles.logo}>IVES_HUB Chat</h1>
            <div className={styles.chatContainer}>
                <div className={styles.sidebar}>
                    <h2>Active Users</h2>
                    <ul>
                        {activeUsers.map(user => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.chatArea}>
                    <div className={styles.messageList} ref={messageListRef}>
                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    className={`${styles.message} ${message.userId === userId
                                        ? styles.currentUserMessage
                                        : message.userId === 'system'
                                            ? styles.systemMessage
                                            : styles.otherUserMessage
                                        }`}
                                >
                                    <span className={styles.messageText}>{message.text}</span>
                                    <span className={styles.messageTime}>
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {typingUsers.length > 0 && (
                        <div className={styles.typingIndicator}>
                            {typingUsers.length === 1
                                ? `${activeUsers.find(u => u.id === typingUsers[0])?.username} is typing...`
                                : `${typingUsers.length} users are typing...`}
                        </div>
                    )}
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.input}
                            value={inputMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter the Matrix..."
                        />
                        <button className={styles.button} onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return isJoined ? renderChatInterface() : renderJoinScreen();
}
