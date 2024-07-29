export default function generateAppConfig(options) {
  const { name } = options;

  // Window config
  const appConfig = {
    title: name,
  };
  // Content
  const content = JSON.stringify(
    {
      app: appConfig,
      debug: false,
      zones:["admin-dashboard-primary-area-block"],
      listCSS: [],
      listSyncJS: [],
      listAsyncJS: [],
    },
  ).trim();
  

  return {
    content,
    appConfig,
  };
}


