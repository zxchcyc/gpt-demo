import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const renderMarkdown = ({ value }) => {
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

const ChatMessage = ({ message, idx }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Q{idx + 1}:</Typography>
        {renderMarkdown({ value: message.input })}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">A{idx + 1}:</Typography>
        {renderMarkdown({ value: message.output })}
      </Grid>
      <Divider style={{ margin: '20px 0' }} />
    </>
  );
};

export default ChatMessage;