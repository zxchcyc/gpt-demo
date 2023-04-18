import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { toPng } from 'html-to-image';

import ChatMessage from './ChatMessage';
import FormComponent from './FormComponent';
import { prompts } from '../constants/chat.constants';
import sendRequest from '../repos/aistudio';

const SimpleChat = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('全能型');
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

  const handleSelectChange = (event) => {
    setSelectedAssistant(event.target.value);
  };

  const handleInputSubmit = async () => {
    setIsLoading(true);
    const inputValue = inputRef.current.value;
    const actualInputContent = `${prompts[selectedAssistant]} ${inputValue}`;
    const topicContents = [...chatData];
    topicContents.push({input: actualInputContent});

    const result = await sendRequest(JSON.stringify(topicContents));
    setChatData((prevChatData) => [...prevChatData, { input: inputValue, output: result }]);
    setIsLoading(false);
    // inputRef.current.focus();
    inputRef.current.value = '';
  };

  const handleDownloadImage = () => {
    if(!chatData.length) return;
    
    const node = document.getElementById('chat-messages');
    toPng(node).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'chat-image.png';
      link.href = dataUrl;
      link.click();
    }).catch((error) => {
      console.error('Error occurred while generating image', error);
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} id="chat-messages">
        {chatData.map((item, index) => (
          <ChatMessage key={index} message={item} idx={index} />
        ))}
      </Grid>
      <Grid item xs={12}>
        <FormComponent
          selectedAssistant={selectedAssistant}
          handleSelectChange={handleSelectChange}
          handleInputSubmit={handleInputSubmit}
          handleDownloadImage={handleDownloadImage}
          handleClearPrompt={handleClearPrompt}
          isLoading={isLoading}
          inputRef={inputRef}
        />
      </Grid>
    </Grid>
  );
};

export default SimpleChat;