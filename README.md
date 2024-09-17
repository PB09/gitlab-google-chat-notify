# GitLab Google Chat Notify

This project enables you to send notifications to a Google Chat space when specific events (like job success or failure) occur in your GitLab pipelines.

## Prerequisites

1. A Google Chat Space with webhook integration.
2. Access to your GitLab repository where pipeline notifications will be set up.
3. Node.js installed (Refer to the runtime mentioned in `package.json`).

## Installation

1. Clone the repository:

   ```bash
   git clone [invalid URL removed]
   ```

2. Navigate to the project directory:

   ```bash
   cd gitlab-google-chat-notify
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Setup Instructions

### 1. Create a Google Chat Webhook

- Navigate to your Google Chat Space where notifications should be sent.
- Create a webhook by selecting **Integrations** → **Webhooks**.
- After creating the webhook, Google will provide you with a **Webhook URL**.
- Add this Webhook URL to your `.env` file under the `GCHAT_NOTIFY_URL_GITLAB` variable.

### 2. Set GitLab Webhook Secret

- Generate a secret token that will be used to verify requests coming from GitLab.
- Add this token to your `.env` file under the `GITLAB_SECRET_TOKEN` variable.
- This token will be used in the **Secret Token** field when setting up the webhook in GitLab.

### 3. Configure Logging Level

- Set the `LOG_LEVEL` environment variable to control the logging level in your application. The default level is `info`. Possible values include `error`, `warn`, `info`, `verbose`, `debug`, and `silly`.
- Add `LOG_LEVEL` to your `.env` file:

    ```plaintext
    LOG_LEVEL=info
    ```

### 4. Start the Server

- After setting your environment variables, start the server using the command:

    ```bash
    npm start
    ```

### 5. Create a GitLab Webhook

- In your GitLab repository, go to **Settings** → **Webhooks**.
- Add a new webhook using the following information:
  - **URL**: `http://HOST:PORT/API_PREFIX_ROUTE/webhook/gitlab` (replace `HOST`, `PORT`, and `API_PREFIX_ROUTE` with your actual values from the `.env` file).
  - **Secret Token**: Use the token that you added to your `.env` file in step 2 (`GITLAB_SECRET_TOKEN`).
  - **Trigger**: Select **Job Events**.
- Save the webhook.

### 6. Customize Notification Triggers

- For receiving notifications for **all job events** (success, failure, and cancelation), use the endpoint `http://HOST:PORT/API_PREFIX_ROUTE/webhook/gitlab`.
- If you want to receive notifications for specific job statuses only, you can append the `triggerStatus` query parameter:
  - For success: `http://HOST:PORT/API_PREFIX_ROUTE/webhook/gitlab?triggerStatus=success`
  - For failure: `http://HOST:PORT/API_PREFIX_ROUTE/webhook/gitlab?triggerStatus=failed`

> **Note**: If an incorrect `triggerStatus` value is passed, no notification will be triggered.

## Environment Variables

Ensure the following variables are set in your `.env` file (refer to `.env.sample` for the correct format):

- `HOST`: The host where the application is running.
- `PORT`: The port where the application is running.
- `API_PREFIX_ROUTE`: The API prefix route used for the webhook.
- `GCHAT_NOTIFY_URL_GITLAB`: The Google Chat webhook URL.
- `GITLAB_SECRET_TOKEN`: Secret token for GitLab webhook verification.
- `LOG_LEVEL`: The logging level for Winston (e.g., `info`, `debug`, `error`).

## Project Runtime

- Refer to the Node.js runtime specified in the `package.json` file to ensure your environment meets the required version.

## Conclusion

By following these steps, you can set up GitLab pipeline event notifications that are sent to your Google Chat space. You have the flexibility to receive notifications for all events or filter by specific job statuses (success, failure). Configure logging using `LOG_LEVEL` to control the verbosity of the logs based on your needs. Make sure your environment variables are correctly set for smooth operation.
