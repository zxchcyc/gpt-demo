import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { Container, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChatInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': {
    margin: '0 8px',
  },
});

const ChatInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post(
      "https://aistudios.com/api/text_rephraser_all2",
      {
          "text_type": "basic",
          "text_tone": "happy",
          "text_length": "short",
          "preview": "",
          "chinese": true,
          "lang": "en-US",
          "topic": inputValue,
          "action": "simple"
      }
    );
    const { result } = response.data;
    setInputValue('');
    onSubmit(result);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <ChatInputContainer>
      <TextField
        label="What do you want to say?"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Send
      </Button>
    </ChatInputContainer>
  );
};

export default ChatInput;
