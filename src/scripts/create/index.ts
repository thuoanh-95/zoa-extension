import path from "path";
import exec from "exec-sh";
import fse from "../../utils/fs-extra";
import * as log from "../../utils/log";
import generateAppConfig from "./utils/generate-app-config";
import config from "../../config";
import generatePackageJson from "./utils/generate-package-json";
import createFolders from "./templates/create-folders";
import { generateNpmScripts } from "./utils/generate-npm-scripts";
import chalk from "chalk";
import generateReadme from "./utils/generate-readme";
import generateGitignore from "./utils/generate-gitignore";
import copyAssets from "./templates/copy-assets";

const waitText = chalk.gray("(Please wait, it can take a while)");

export default async function (
  options: any,
  logger: any,
  { exitOnError = true, iconFile = null } = {}
) {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();

  function errorExit(err) {
    log.error(err.stderr || err);
    if (exitOnError) process.exit(1);
  }
  if (!logger) {
    logger = {
      statusStart() {},
      statusDone() {},
      statusError() {},
      text() {},
      error() {},
    };
  }

  logger.statusStart("Generating app-config.json");

  const appConfig = generateAppConfig(options);

  fse.writeFileSync(
    path.join(cwd, config.filename.appConfig),
    appConfig.content
  );
  logger.statusDone("Generating app-config.json");

  if (!options.newProject) {
    const deployScripts = generateNpmScripts(["r"]).map((s) => {
      return `${s.icon} Run "npm run ${s.name}" - ${s.description}`;
    });
    logger.text(deployScripts.join("\n"));
    // process.exit(0);
  }

  // Package
  logger.statusStart("Generating package.json");
  const packageJson = generatePackageJson(options);

  fse.writeFileSync(path.join(cwd, "package.json"), packageJson.content);
  fse.writeFileSync(
    path.join(cwd, config.filename.zoaConfig),
    JSON.stringify(options)
  );

  logger.statusDone("Generating package.json");

  // Create Folders
  logger.statusStart("Creating required folders structure");
  try {
    createFolders(options);
  } catch (err) {
    logger.statusError("Error creating required folders structure");
    if (err) logger.error(err.stderr);
    errorExit(err);
  }
  logger.statusDone("Creating required folders structure");

  // Install NPM depenencies
  logger.statusStart(`${"Installing NPM Dependencies"} ${waitText}`);
  try {
    if (!isRunningInCwd) {
      await exec.promise(
        `cd ${cwd.replace(
          / /g,
          "\\ "
        )} && npm install ${packageJson.dependencies.join(" ")} --save`,
        true
      );
    } else {
      await exec.promise(
        `npm install ${packageJson.dependencies.join(" ")} --save`,
        true
      );
    }
  } catch (err) {
    logger.statusError("Error installing NPM Dependencies");
    // if (err) logger.error(err.stderr);
    errorExit(err);
    return;
  }
  logger.statusDone("Installing NPM Dependencies");

  // Install NPM dev depenencies
  logger.statusStart(`${"Installing NPM Dev Dependencies"} ${waitText}`);
  try {
    if (!isRunningInCwd) {
      await exec.promise(
        `cd ${cwd.replace(
          / /g,
          "\\ "
        )} && npm install ${packageJson.devDependencies.join(" ")} --save-dev`,
        true
      );
    } else {
      await exec.promise(
        `npm install ${packageJson.devDependencies.join(" ")} --save-dev`,
        true
      );
    }
  } catch (err) {
    logger.statusError("Error installing NPM Dev Dependencies");
    // if (err) logger.error(err.stderr);
    errorExit(err);
    return;
  }
  logger.statusDone("Installing NPM Dev Dependencies");

  // Generate Readme
  const readMeContent = generateReadme(options);
  try {
    fse.writeFileSync(path.join(cwd, "README.md"), readMeContent);
  } catch (err) {
    logger.statusError("Error creating project files");
    // if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }

  // Generate .gitignore
  const gitignoreContent = generateGitignore(options);
  try {
    fse.writeFileSync(path.join(cwd, ".gitignore"), gitignoreContent);
  } catch (err) {
    logger.statusError("Error creating project files");
    // if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }

  // Create Project Files
  logger.statusStart("Creating project files");
  const filesToCopy = copyAssets(options);
  try {
    // eslint-disable-next-line
    await Promise.all(
      filesToCopy.map((f) => {
        if (f.from) {
          return fse.copyFileAsync(f.from, f.to);
        }
        if (f.content) {
          return fse.writeFileAsync(f.to, f.content);
        }
        return Promise.resolve();
      })
    );
  } catch (err) {
    logger.statusError("Error creating project files");
    // if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }
  logger.statusDone("Creating project files");
}
