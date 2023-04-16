import axios from 'axios';

async function sendRequest(topicContents: string) {
    const data = {
      "text_type": "basic",
      "text_tone": "happy",
      "text_length": "long",
      "preview": "",
      "chinese": true,
      "lang": "en-US",
      "action": "simple",
      topic: topicContents,
    };
    
    const response = await axios.post(
      'https://aistudios.com/api/text_rephraser_all2',
      data
    );
    
    return response.data.result;
  }

export default sendRequest;
