

import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatInput from './ChatInput';

const ChatContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const ChatBubble = styled(Box)(({ isUser }) => ({
  padding: '8px',
  borderRadius: '8px',
  backgroundColor: isUser ? '#e7f3fe' : '#f0f0f0',
  marginTop: '16px',
  maxWidth: '80%',
}));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages([...messages, { text: message, isUser: false }]);
  };

  return (
    <ChatContainer>
      <Container maxWidth="md">
        {messages.map((message, i) => (
          <ChatBubble key={i} isUser={message.isUser}>
            <Markdown>{message.text}</Markdown>
          </ChatBubble>
        ))}
        <ChatInput onSubmit={handleNewMessage} />
      </Container>
    </ChatContainer>
  );
};

export default ChatPage;