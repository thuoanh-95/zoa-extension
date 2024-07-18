export default {
  api_domain: "https://dev-marketplace.zapps.me",
  root_env: () => `${process.cwd()}/.env`,
  env: {
    appId: "APP_ID",
    token: "ZOA_TOKEN",
  },
  filename: {
    appConfig: "app-config.json",
    zoaConfig: "zoa-cli.json",
    packageJson: "package.json",
  },
  resumable_option: {
    chunkSize: 512 * 1000, // bytes -> 512kb/chunk
    simultaneousUploads: 4,
    testChunks: true,
    throttleProgressCallbacks: 1,
    method: "octet",
    forceChunkSize: false,
  },
};
