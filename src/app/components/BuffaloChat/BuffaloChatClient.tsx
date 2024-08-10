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
    const [showUserList, setShowUserList] = useState(false);
    const messageListRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [joinAnimation, setJoinAnimation] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const addMessage = useCallback((message: ChatMessage) => {
        setMessages((prevMessages) => {
            if (!prevMessages.some(m => m.id === message.id)) {
                return [...prevMessages, message];
            }
            return prevMessages;
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setShowUserList(window.innerWidth > 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
            setJoinAnimation(true);
            setTimeout(() => {
                socket.emit('join', username);
                setIsJoined(true);
            }, 2000);
        }
    };

    const toggleUserList = () => {
        setShowUserList(prev => !prev);
    };

    const renderJoinScreen = () => (
        <motion.div
            className={styles.joinContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.matrixRainContainer}>
                <MatrixRain />
            </div>
            <motion.div
                className={styles.joinContent}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h1 className={styles.logo}>IVES_HUB Chat</h1>
                <motion.div
                    className={styles.inputWrapper}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <input
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                    />
                </motion.div>
                <motion.button
                    className={styles.button}
                    onClick={handleJoin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!username.trim()}
                >
                    Join Chat
                </motion.button>
            </motion.div>
            {joinAnimation && (
                <motion.div
                    className={styles.joinAnimation}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 2 }}
                >
                    <div className={styles.codeRain} />
                </motion.div>
            )}
        </motion.div>
    );

    const renderChatInterface = () => (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.matrixRainContainer}>
                <MatrixRain />
            </div>
            <div className={styles.chatHeader}>
                <h1 className={styles.logo}>IVES_HUB Chat</h1>
                {isMobile && (
                    <button
                        className={styles.toggleUserListButton}
                        onClick={toggleUserList}
                    >
                        {showUserList ? 'Hide Users' : 'Show Users'}
                    </button>
                )}
            </div>
            <div className={styles.chatContainer}>
                <AnimatePresence>
                    {(showUserList || !isMobile) && (
                        <motion.div
                            className={`${styles.sidebar} ${showUserList ? styles.show : ''}`}
                            initial={isMobile ? { opacity: 0, y: -100 } : { opacity: 1, x: 0 }}
                            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                            exit={isMobile ? { opacity: 0, y: -100 } : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2>Active Users</h2>
                            <ul>
                                {activeUsers.map(user => (
                                    <motion.li
                                        key={user.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {user.username}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        <motion.input
                            ref={inputRef}
                            className={styles.input}
                            value={inputMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter the Matrix..."
                            whileFocus={{ scale: 1.02 }}
                        />
                        <motion.button
                            className={styles.button}
                            onClick={sendMessage}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Send
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return isJoined ? renderChatInterface() : renderJoinScreen();
}