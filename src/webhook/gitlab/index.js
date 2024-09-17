const httpStatus = require('http-status');

const { GCHAT_NOTIFY_URL_GITLAB } = require('../../config');
const notifyGoogleChat = require('../../utils/notify-google-chat');
const logger = require('../logger');

const { BUILD_STATUS, TRIGGER_STATUS } = require('./constants');
const createCardHeader = require('./create-card-header');
const createCardSection = require('./create-card-section');

const createCardV2Body = webhookData => {
  const card = {};

  card.header = createCardHeader(webhookData);
  card.sections = createCardSection(webhookData);

  return {
    cardsV2: [
      {
        card,
      },
    ],
  };
};

const NOTIFY_GCHAT_STATUS = [BUILD_STATUS.FAILED, BUILD_STATUS.SUCCESS, BUILD_STATUS.CANCELED];

const gitlabWebhookHandler = async (req, res) => {
  const { body = {}, query = {}, logInfo = {} } = req;
  try {
    const {
      object_kind: webhookType,
      build_status: buildStatus,
    } = body;

    if (webhookType !== 'build') {
      logger.error(`gitlabWebhookHandler > RECEIVED INVALID WEBHOOK TYPE: ${webhookType}`);
      return res.sendStatus(httpStatus.OK);
    }

    const { triggerStatus = TRIGGER_STATUS.ALWAYS } = query; // Default to always if not provided

    const shouldNotify = (triggerStatus === TRIGGER_STATUS.ALWAYS) // ALWAYS TRIGGERING THE BUILD
                         || (triggerStatus === TRIGGER_STATUS.SUCCESS && buildStatus === BUILD_STATUS.SUCCESS)
                         || (triggerStatus === TRIGGER_STATUS.FAILED && buildStatus === BUILD_STATUS.FAILED);

    if (shouldNotify && NOTIFY_GCHAT_STATUS.includes(buildStatus)) {
      const messageBody = createCardV2Body(body);
      const messageBodyString = JSON.stringify(messageBody);
      await notifyGoogleChat(GCHAT_NOTIFY_URL_GITLAB, messageBodyString);
    }
  } catch (error) {
    logger.error(`Error from gitlabWebhookHandler > ${error}`, logInfo);
  }
  return res.sendStatus(httpStatus.OK);
};

module.exports = gitlabWebhookHandler;

