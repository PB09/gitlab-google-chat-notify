const createCardHeader = webhookData => {
  const { build_name: buildName, build_stage: buildStage } = webhookData;
  const cardHeader = {};

  cardHeader.title = buildName;
  cardHeader.subtitle = `Stage: ${buildStage}`;
  cardHeader.imageUrl = '';
  cardHeader.imageType = 'SQUARE';
  cardHeader.imageAltText = 'Gitlab Logo';

  return cardHeader;
};

module.exports = createCardHeader;

