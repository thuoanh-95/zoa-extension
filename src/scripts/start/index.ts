import ora from "ora";
import { createServer } from "vite";
import { getEnv } from "../../utils/env";
import config from "../../config";
import fse from "../../utils/fs-extra";
import path from "path";
import chalk from "chalk";

const spinner = ora("Starting zoa extension...");

export default async function (
  options: any,
  logger,
  { exitOnError = true } = {}
) {
  function errorExit(err) {
    logger.error(err.stderr || err);
    if (exitOnError) process.exit(1);
  }
  if (!logger) {
    // eslint-disable-next-line
    logger = {
      statusStart() {},
      statusDone() {},
      statusError() {},
      text() {},
      error() {},
    };
  }
  spinner.start();

  const host = "localhost";
  const port = options.port || 3000;
  const mode = options.mode || "development";

  const cwd = options.cwd || process.cwd();
  const appId = options.appId || getEnv(config.env.appId);

  const localServer = {};

  let server;
  let subdomain;
  let freePort;

  const publicServer = {
    host: "0.0.0.0",
    hmr: {
      host: host,
      protocol: "ws",
    },
  };

  let viteConfig = "vite.config.js";
  const isTypeScriptProject = fse.existsSync(path.join(cwd, "vite.config.ts"));
  if (isTypeScriptProject) {
    viteConfig = "vite.config.ts";
  }

  try {
    server = await createServer({
      configFile: path.join(cwd, viteConfig),
      root: cwd,
      mode,
      define: {
        "process.env.NODE_ENV": JSON.stringify(mode),
      },
      server: {
        port,
        host,
      },
    });

    await server.listen();
    const info = server.config.logger.info;
    info(chalk.green(`Server is running at: ${port}`));
    server?.printUrls();
    
  } catch (err) {
    logger.statusError("Error starting project");
    // if (err) logger.error(err.stderr || err);
    // logger.error(err);
    // errorExit(err);
    return;
  }
}
