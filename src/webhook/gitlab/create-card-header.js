const createCardHeader = webhookData => {
  const { build_name: buildName, build_stage: buildStage } = webhookData;
  const cardHeader = {};

  cardHeader.title = buildName;
  cardHeader.subtitle = `Stage: ${buildStage}`;
  cardHeader.imageUrl = 'https://raw.githubusercontent.com/PB09/gitlab-google-chat-notify/main/assets/gitlab-logo.png';
  cardHeader.imageType = 'SQUARE';
  cardHeader.imageAltText = 'Gitlab Logo';

  return cardHeader;
};

module.exports = createCardHeader;

