export default function generateAppConfig(options) {
  const { name } = options;

  // Window config
  const appConfig = {
    title: name,
  };
  // Content
  const content = JSON.stringify({
    app: appConfig,
    debug: false,
    zones: {
      "admin-dashboard-primary-area-block": {
        enable: true,
      },
      "admin-chat-message-profile-block": {
        enable: true,
        roles: ["MANAGER", "MODERATOR"],
      },
    },
    listCSS: [],
    listSyncJS: [],
    listAsyncJS: [],
  }).trim();

  return {
    content,
    appConfig,
  };
}
