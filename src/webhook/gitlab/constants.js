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
    success: '',
    canceled: '',
    failed: '',
  },
  STATUS_MESSAGE: {
    success: 'Run was successful',
    canceled: 'Run was cancelled',
    failed: 'Run failed',
  },
  TRIGGER_STATUS: {
    ALWAYS: 'always',
    SUCCESS: 'success',
    FAILED: 'failed',
  },
};
