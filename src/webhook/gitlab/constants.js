module.exports = {
  BUILD_STATUS: {
    FAILED: 'failed',
    RUNNING: 'running',
    PENDING: 'pending',
    SUCCESS: 'success',
    CREATED: 'created',
    CANCELED: 'canceled',
  },
  STATUS_COLOR: {
    success: '#31AF91',
    canceled: '#EFCC00',
    failed: '#FF0B0B',
  },
  STATUS_IMAGE: {
    success: 'https://raw.githubusercontent.com/PB09/gitlab-google-chat-notify/main/assets/success-128.png',
    canceled: 'https://raw.githubusercontent.com/PB09/gitlab-google-chat-notify/main/assets/canceled-128.png',
    failed: 'https://raw.githubusercontent.com/PB09/gitlab-google-chat-notify/main/assets/failure-128.png',
  },
  STATUS_MESSAGE: {
    success: 'Run was successful',
    canceled: 'Run was canceled',
    failed: 'Run failed',
  },
  TRIGGER_STATUS: {
    ALWAYS: 'always',
    SUCCESS: 'success',
    FAILED: 'failed',
  },
};
