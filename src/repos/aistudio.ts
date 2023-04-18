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
      topic:  "假设我们在对话, 我是 input, 你是 output, 你的回答不用包含 output 字段, 这是对话的上下文——" + topicContents,
    };
    
    const response = await axios.post(
      'https://aistudios.com/api/text_rephraser_all2',
      data
    );
    
    return response.data.result;
  }

export default sendRequest;
