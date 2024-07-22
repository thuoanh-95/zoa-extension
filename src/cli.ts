#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import logSymbols from "log-symbols";
import * as log from "./utils/log";
import { fetchQRCode, loginApp } from "./scripts/login";
import pkg from "../package.json";
import chalk from "chalk";
import config from "./config";
import { getEnv, setEnv } from "./utils/env";
import getCurrentProject from "./utils/get-current-project";
import getLoginOptions from "./scripts/login/get-options";
import spinner from "./utils/spinner";
import buildApp from "./scripts/build";
import deployApp from "./scripts/deploy";

import getDeployOptions from "./scripts/deploy/get-deploy-options";
import create from "./scripts/create";
import getOptions from "./scripts/create/utils/get-options";

const cwd = process.cwd();
const program = new Command();

const logger = {
  statusStart: (text) => spinner.start(text),
  statusDone: (text) => spinner.done(text),
  statusText: (text) => spinner.text(text),
  statusError: (text) => spinner.error(text),
  text: (text) => log.text(text),
  error: (text) => log.error(text),
  showOnUI: () => {},
};

console.log(
  chalk.cyan(
    figlet.textSync("ZOA CLI", {
      horizontalLayout: "full",
      verticalLayout: "full",
    })
  )
);

program
  .version(pkg.version)
  .usage("<command> [options]")
  .command("init")
  .option("--skipUpdate", "Skip checking for update of zoa-cli")
  .description("Init ZOA Extension project")
  .action(async (options) => {
    const currentProject = getCurrentProject(cwd);
    if (currentProject) {
      log.text(
        `${logSymbols.error} ZOA Extension project already set up in current directory`
      );
      process.exit(1);
    }
    const optsLogin = await getLoginOptions();
    console.log("optsLogin", optsLogin);
    if (optsLogin.appId && !getEnv(config.env.appId))
      setEnv(config.env.appId, optsLogin.appId);
    await loginApp({ cwd, ...optsLogin }, logger);
    const opts = await getOptions();

    await create(opts, logger);
    process.exit(0);
  });

program
  .usage("<command> [options]")
  .command("login")
  .option("--skipUpdate", "Skip checking for update of zoa-cli")
  .description("Login ZOA")
  .action(async () => {
    await fetchQRCode(
      `${config.api_domain}/api/auth`,
      getEnv(config.env.appId)
    );
    process.exit(0);
  });

program
  .usage("<command> [options]")
  .command("build")
  .description("Build a ZOA Extension project")
  .action(async () => {
    const currentProject = getCurrentProject(cwd);

    if (!currentProject) {
      log.text(`${logSymbols.error} This is not ZOA Extension project`);
      process.exit(1);
    }

    await buildApp(
      {
        cwd,
      },
      logger
    );
    process.exit(0);
  });

program
  .usage("<command> [options]")
  .command("deploy")
  .option("-D, --dev", "Deploy in Development server")
  .option("-M, --mode <m>", "Env mode")
  // .option("-p, --passive", "Passive mode (non-interactive)")
  // .option("-e, --existing", "Deploy existing project")
  // .option("-t, --testing", "Deploy testing version")
  // .option("-m, --desc <message>", "Version description")
  // .option("-o, --outputDir <output>", "Output folder. Default www")
  .option(
    "-P, --port <n>",
    "Specify UI server port. By default it is 3001",
    parseInt
  )
  .description("Deploy a ZOA Extension project")
  .action(async (options) => {
    const currentProject = getCurrentProject(cwd);

    if (!currentProject) {
      log.text(`${logSymbols.error} This is not ZOA Extension project`);
      process.exit(1);
    }

    const deployOptions = await getDeployOptions();

    await deployApp(
      {
        ...deployOptions,
        cwd,
      },
      logger
    );
    process.exit(0);
  });

program.parse(process.argv);

const options = program.opts();
