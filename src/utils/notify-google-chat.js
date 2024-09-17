const axios = require('axios');

const notifyGoogleChat = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    const responseBody = response.data;
    console.log(`Google Chat response: ${JSON.stringify(responseBody)}`);

    return responseBody;
  } catch (error) {
    if (error.response && error.response.data) {
      const { message, status, code } = error.response.data.error;
      throw new Error(
        `Google Chat notification failed! message=${message} status=${status} code=${code}`,
      );
    }
    throw new Error(`Google Chat notification failed! ${error.message}`);
  }
};

module.exports = notifyGoogleChat;

