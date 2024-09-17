require('dotenv').config();
const http = require('http');

const cors = require('cors');
const express = require('express');

const packageJson = require('../package.json');

const CONFIG = require('./config');
const { VERSION_ROUTE, WEBHOOK_PREFIX } = require('./constants/api-constants');
const errorHandler = require('./middlewares/error-handler');
const setLocaleServiceInReq = require('./middlewares/set-locale-service-in-req');
const setLogInfoInReq = require('./middlewares/set-log-info-in-req');
const i18n = require('./utils/intl/i18n-config');
const LocaleService = require('./utils/intl/locale-service');
const Logger = require('./utils/logger');
const webhookRoutes = require('./webhook');

const localeService = new LocaleService(i18n);

const app = express();

const logger = new Logger('index');

// CORS AND PARSERS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(setLogInfoInReq);
app.use(setLocaleServiceInReq(localeService));

app.get(`/${CONFIG.API_PREFIX_ROUTE}${VERSION_ROUTE}`, (req, res) => { res.json({ version: packageJson.version }); });

app.use(`/${CONFIG.API_PREFIX_ROUTE}${WEBHOOK_PREFIX}`, webhookRoutes);

// POST REQUEST EXECUTION MIDDLEWARES
app.use(errorHandler);

const initServer = async () => {
  try {
    const httpServer = http.createServer(app);
    httpServer.listen(CONFIG.PORT, () => {
      logger.info(`🚀 Server ready at http://localhost:${CONFIG.PORT}/${CONFIG.API_PREFIX_ROUTE}/graphql`);
    });
    return true;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

initServer();

module.exports = app;
