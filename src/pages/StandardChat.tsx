import React, { useState } from 'react';
import axios from 'axios';
import { Divider, Typography, Grid, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReactMarkdown from 'react-markdown';
// import { ReactCopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
let contextPrompt: string[] = [];
const promptMap = {
  "全能型": "",
  "医生": "我想让你扮演医生的角色，想出创造性的治疗方法来治疗疾病。您应该能够推荐常规药物、草药和其他天然替代品。在提供建议时，您还需要考虑患者的年龄、生活方式和病史。",
  "心理医生": "我想让你担任心理医生。我将为您提供一个寻求指导和建议的人，以管理他们的情绪、压力、焦虑和其他心理健康问题。您应该利用您的认知行为疗法、冥想技巧、正念练习和其他治疗方法的知识来制定个人可以实施的策略，以改善他们的整体健康状况。",
  "数学老师": "我想让你扮演一名数学老师。我将提供一些数学方程式或概念，你的工作是用易于理解的术语来解释它们。这可能包括提供解决问题的分步说明、用视觉演示各种技术或建议在线资源以供进一步研究。",
  "哲学老师": "我要你担任哲学老师。我会提供一些与哲学研究相关的话题，你的工作就是用通俗易懂的方式解释这些概念。这可能包括提供示例、提出问题或将复杂的想法分解成更容易理解的更小的部分。",
  "英语翻译": "我希望你能担任英语翻译、拼写校对和修辞改进的角色。我会用任何语言和你交流你会识别语言,将其翻译并用更为优美和精炼的英语回答我。请将我简单的词汇和句子替换成更为优美和高雅的表达方式,确保意思不变,但使其更具文学性。请仅回答更正和改进的部分,不要写解释。",
  "中文翻译": "下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。",
  "前端专家": "我想让你充当前端开发专家。我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。",
  "产品经理": "请确认我的以下请求。请您作为产品经理回复我。我将会提供一个主题，您将帮助我编写一份包括以下章节标题的PRD文档：主题、简介、问题陈述、目标与目的、用户故事、技术要求、收益、KPI指标、开发风险以及结论。",
  "旅游指南": "我想让你做一个旅游指南。我会把我的位置写给你，你会推荐一个靠近我的位置的地方。在某些情况下，我还会告诉您我将访问的地方类型。您还会向我推荐靠近我的第一个位置的类似类型的地方。",
  "讲故事": "我想让你扮演讲故事的角色。您将想出引人入胜、富有想象力和吸引观众的有趣故事。它可以是童话故事、教育故事或任何其他类型的故事，有可能吸引人们的注意力和想象力。根据目标受众，您可以为讲故事环节选择特定的主题或主题，例如，如果是儿童，则可以谈论动物；如果是成年人，那么基于历史的故事可能会更好地吸引他们等等。",
};
let selectPrompt = '';

const StandardChat = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('全能型');
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClearPrompt = () => { contextPrompt = []; }
  const handleInputChanged = (event) => {
    setInputValue(event.target.value);
  };
 
  const handleSelectChange = async (event) => {
    setSelectedAssistant(event.target.value);
    selectPrompt = promptMap[event.target.value];
  };

  const handleInputSubmit = async () => {
    setIsLoading(true);
    contextPrompt.push(`${selectPrompt} ${inputValue}`);
    const response = await axios.post(
        "https://aistudios.com/api/text_rephraser_all2",
        {
            "text_type": "basic",
            "text_tone": "happy",
            "text_length": "long",
            "preview": "",
            "chinese": true,
            "lang": "en-US",
            "topic": JSON.stringify(contextPrompt),
            "action": "simple"
        }
    );
    contextPrompt.push(response.data.result);
    setChatData([...chatData, { input: inputValue, output: response.data.result }]);
    setInputValue('');
    setIsLoading(false);
  };

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {chatData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                Q{index+1}:
                {renderMarkdown({ value: item.input})}
              </Grid>
              <Grid item xs={12}>
                A{index+1}:
                {renderMarkdown({ value: item.output})}
              </Grid>
              <Divider style={{margin: '20px 0'}}/>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth style={{margin: '10px 0'}}>
          <InputLabel id="demo-simple-select-label">选择助手</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAssistant}
            label="选择助手"
            onChange={handleSelectChange}
          >
            {Object.keys(promptMap).map((item, index) => {
              return (
                <MenuItem value={item} key={index}>{item}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Typography>{selectPrompt}</Typography> */}
        <TextField
          label="您需要问点什么..."
          value={inputValue}
          onChange={handleInputChanged}
          fullWidth
          autoFocus
          multiline
          minRows="2"
        />
        {isLoading && <Typography>对方正在输入...</Typography>}
          <Button variant="contained" onClick={handleInputSubmit}>
            发送
          </Button>
          <Button variant="outlined" onClick={handleClearPrompt} style={{margin: 10}}>
            清除上下文
          </Button> 
      </Grid>
    </Grid>
  );
};

export default StandardChat;


