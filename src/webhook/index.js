const app = require('express');

const { API_GITLAB_WEBHOOK } = require('../constants/api-constants');

const gitlabWebhookHandler = require('./gitlab');

const webhookRoutes = app.Router();

webhookRoutes.post(API_GITLAB_WEBHOOK, gitlabWebhookHandler);

module.exports = webhookRoutes;
