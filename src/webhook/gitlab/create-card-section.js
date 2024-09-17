
const {
  STATUS_IMAGE, STATUS_COLOR, STATUS_MESSAGE,
} = require('./constants');

const gitlabIconUrl = '';
const gitBranchIconUrl = '';
const gitBranchCircleIconUrl = '';

const createCardSection = webhookData => {
  const {
    repository, build_id: buildId, sha: commitSha, build_status: buildStatus, project_name: projectName, ref: branch,
  } = webhookData;
  const { homepage: repoUrl } = repository;

  const jobUrl = `${repoUrl}/-/jobs/${buildId}`;
  const commitUrl = `${repoUrl}/-/commit/${commitSha}`;

  const cardV2Section = [
    {
      collapsible: false,
      uncollapsibleWidgetsCount: 1,
      widgets: [{}],
    },
  ];

  // ADDING JOB STATUS INTO MESSAGE
  cardV2Section[0].widgets.push({
    decoratedText: {
      startIcon: {
        iconUrl: STATUS_IMAGE[buildStatus],
      },
      text: `<font color="${STATUS_COLOR[buildStatus]}">${
        STATUS_MESSAGE[buildStatus]
      }</font>`,
    },
  });

  const buttonArray = [
    {
      text: 'Go to repo',
      icon: {
        iconUrl: gitlabIconUrl,
      },
      onClick: {
        openLink: {
          url: repoUrl,
        },
      },
    },
    {
      text: 'Go to job',
      icon: {
        knownIcon: 'STAR',
      },
      onClick: {
        openLink: {
          url: jobUrl,
        },
      },
    },
    {
      text: 'Go to commit',
      icon: {
        iconUrl: gitBranchIconUrl,
      },
      onClick: {
        openLink: {
          url: commitUrl,
        },
      },
    },
  ];

  cardV2Section[0].widgets.push(
    {
      decoratedText: {
        startIcon: {
          iconUrl: gitlabIconUrl,
        },
        text: projectName,
      },
    },
    {
      decoratedText: {
        startIcon: {
          iconUrl: gitBranchCircleIconUrl,
        },
        text: branch,
      },
    },
    {
      buttonList: {
        buttons: buttonArray,
      },
    },
  );

  return cardV2Section;
};

module.exports = createCardSection;
