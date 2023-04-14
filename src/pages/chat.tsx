import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
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
      setResponseData(response.data.result);
      setError(null);
    } catch (err) {
      console.error(err);
      setResponseData(null);
      setError('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <TextField
        label="Enter input value"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
      />
      <br/>
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <br/>
      <br />
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {responseData && (
        <div>
          <Typography variant="subtitle1">
            Results for "{inputValue}": "{responseData}"
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

