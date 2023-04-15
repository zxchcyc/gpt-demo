import React, { useState } from 'react';
import axios from 'axios';
import { Divider, Typography, Grid, TextField, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { ReactCopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
let prompt = [];

const StandardChat = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    setCopied(true)
  }

  const handleInputChanged = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async () => {
    setIsLoading(true);
    
    prompt.push(inputValue);
    const response = await axios.post(
        "https://aistudios.com/api/text_rephraser_all2",
        {
            "text_type": "basic",
            "text_tone": "happy",
            "text_length": "long",
            "preview": "",
            "chinese": true,
            "lang": "en-US",
            "topic": JSON.stringify(prompt),
            "action": "simple"
        }
    );
    prompt.push(response.data.result);
    console.log("prompt", prompt);

    setChatData([...chatData, { input: inputValue, output: response.data.result }]);
    setInputValue('');
    setIsLoading(false);
  };

  const renderMarkdown = ({ value, language }) => {
    // 定制渲染器
    return (
      <ReactMarkdown
        children={value}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                style={solarizedlight}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true} // 是否展示左侧行数
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }}
      />
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {chatData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                问题 {index+1}: 
                {renderMarkdown({ value: item.input})}
              </Grid>
              <Grid item xs={12}>
                答案 {index+1}: 
                {renderMarkdown({ value: item.output})}
              </Grid>
              <Divider style={{margin: '20px 0'}}/>
            </React.Fragment>
          );
        })}
      </Grid>
      {isLoading && <Typography>Loading...</Typography>}
      <Grid item xs={12}>
        <TextField
          label="您需要问点什么..."
          value={inputValue}
          onChange={handleInputChanged}
          fullWidth
          autoFocus
          multiline
        />
        <br/>
        <br />
        <Button variant="contained" onClick={handleInputSubmit}>发送</Button>
      </Grid>
    </Grid>
  );
};

export default StandardChat;


