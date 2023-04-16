import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import ChatMessage from './ChatMessage';
import FormComponent from './FormComponent';
import { prompts } from '../constants/chat.constants';
import sendRequest from '../repos/aistudio';

const SimpleChat = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('全能型');
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, [chatData]);

  const handleClearPrompt = () => {
    setChatData([]);
  };

  const handleInputChanged = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedAssistant(event.target.value);
  };

  const handleInputSubmit = async () => {
    setIsLoading(true);
    const actualInputContent = `${prompts[selectedAssistant]} ${inputValue}`;
    const topicContents = chatData.flatMap((e) => [e.input, e.output]);
    topicContents.push(actualInputContent);

    const result = await sendRequest(JSON.stringify(topicContents));
    setChatData(prevChatData => [...prevChatData, { input: inputValue, output: result }]);
    setInputValue('');
    setIsLoading(false);
    inputRef.current.focus();
    inputRef.current.value = '';
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {chatData.map((item, index) => (
          <ChatMessage key={index} message={item} idx={index} />
        ))}
      </Grid>
      <Grid item xs={12}>
        <FormComponent selectedAssistant={selectedAssistant} handleSelectChange={handleSelectChange} handleInputChanged={handleInputChanged} handleInputSubmit={handleInputSubmit} handleClearPrompt={handleClearPrompt} isLoading={isLoading} inputRef={inputRef}/>
      </Grid>
    </Grid>
  );
};

export default SimpleChat;