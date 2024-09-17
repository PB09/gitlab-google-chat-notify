const axios = require('axios');

const Logger = require('./logger');

const logger = new Logger('notify-google-chat');

const notifyGoogleChat = async (url, body, logInfo = {}) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    const responseBody = response.data;
    logger.debug(`Google Chat response: ${JSON.stringify(responseBody)}`, logInfo);

    return responseBody;
  } catch (error) {
    if (error.response && error.response.data) {
      const { message, status, code } = error.response.data.error;
      logger.error(`Error from notifyGoogleChat - API REQUEST > message=${message} status=${status} code=${code}`, logInfo);
    } else {
      logger.error(`Error from notifyGoogleChat > ${error}`, logInfo);
    }
    throw error;
  }
};

module.exports = notifyGoogleChat;

