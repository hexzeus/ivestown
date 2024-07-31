'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { io, Socket } from 'socket.io-client';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  background-color: #f0f0f0;
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow: hidden;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const Message = styled.div<{ isCurrentUser: boolean }>`
  background-color: ${props => props.isCurrentUser ? '#e6f2ff' : '#f0f0f0'};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  align-self: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
  max-width: 70%;
`;

const MessageInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const SendButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

interface ChatMessage {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
}

export default function BuffaloChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [userId, setUserId] = useState<string>('');
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initSocket = async () => {
            try {
                await fetch('/api/socket');
                const newSocket = io({
                    path: '/api/socket_io',
                });
                setSocket(newSocket);

                newSocket.on('connect', () => {
                    console.log('Connected to server');
                    setUserId(newSocket.id || `user-${Math.random().toString(36).substr(2, 9)}`);
                });

                newSocket.on('chat message', (message: ChatMessage) => {
                    setMessages(prevMessages => {
                        // Check if the message is already in the state
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
            socket.emit('chat message', newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputMessage('');
        }
    };

    return (
        <Container>
            <Logo>Buffalo Chat</Logo>
            <ChatContainer>
                <MessageList ref={messageListRef}>
                    {messages.map(message => (
                        <Message key={message.id} isCurrentUser={message.userId === userId}>
                            {message.text}
                        </Message>
                    ))}
                </MessageList>
                <MessageInput
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <SendButton onClick={sendMessage}>Send</SendButton>
            </ChatContainer>
        </Container>
    );
}