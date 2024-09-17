module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 4000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  API_PREFIX_ROUTE: process.env.API_PREFIX_ROUTE || 'api',
  GCHAT_NOTIFY_URL_GITLAB: process.env.GCHAT_NOTIFY_URL_GITLAB,
  GITLAB_SECRET_TOKEN: process.env.GITLAB_SECRET_TOKEN,
};
