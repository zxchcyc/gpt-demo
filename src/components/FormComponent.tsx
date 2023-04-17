import React from 'react';
import { LinearProgress, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { prompts } from '../constants/chat.constants';

const FormComponent = ({ selectedAssistant, handleSelectChange, handleInputSubmit, handleClearPrompt, isLoading, inputRef }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isLoading) {
    //   handleInputSubmit();
    }
  }

  return (
    <div>
      {isLoading && <LinearProgress style={{ margin: '10px 0' }}/>}
      <FormControl fullWidth style={{ margin: '10px 0' }}>
        <InputLabel id="demo-simple-select-label">选择助手</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedAssistant} label="选择助手" onChange={handleSelectChange}>
          {Object.keys(prompts).map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="您需要问点什么..." fullWidth autoFocus multiline minRows="2"  inputRef={inputRef} onKeyPress={handleKeyPress} />
      <Button variant="contained" onClick={handleInputSubmit}> 发送 </Button>
      <Button variant="outlined" onClick={handleClearPrompt} style={{ margin: 10 }} > 清除上下文 </Button>{' '}
    </div>
  );
};

export default FormComponent;