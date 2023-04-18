import React, {useState} from 'react';
import { Button, Typography, Grid, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const renderMarkdown = ({ value }) => {
  // 定制渲染器
  return (
    <ReactMarkdown
      children={value}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={solarizedlight}
              language={match[1]}
              PreTag='div' // 双引号改为单引号
              showLineNumbers={true} // 是否展示左边行数
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        }
      }}
    />
  );
};

const ChatMessage = ({ message, idx }) => {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Grid item xs={12} style={{ backgroundColor: '#fffaf2', padding: 10 }}>
        <Typography variant='h6' >Q{idx + 1}:</Typography>
        {renderMarkdown({ value: message.input })}
      </Grid>
      <Grid item  xs={12} style={{ backgroundColor: '#fff5e6', padding: 10 }}>
        <Typography variant='h6'>A{idx + 1}:</Typography>
        {renderMarkdown({ value: message.output })}
        <CopyToClipboard text={message.output}
          onCopy={() => setCopied(true)}>
          <Button size="small" variant="outlined">{copied ? '已复制' : '复制'}</Button>
        </CopyToClipboard>
      </Grid>
      <Divider style={{ margin: '20px 0' }} />
    </>
  );
};

export default ChatMessage;