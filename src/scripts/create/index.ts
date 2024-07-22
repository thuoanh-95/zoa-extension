import path from "path";
import fse from "../../utils/fs-extra";
import * as log from "../../utils/log";
import generateAppConfig from "./utils/generate-app-config";
import config from "../../config";
import generatePackageJson from "./utils/generate-package-json";
import createFolder from "./templates/create-folders";
import { generateNpmScripts } from "./utils/generate-npm-scripts";


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
  logger.statusStart('Creating required folders structure');
  try {
    createFolder(options);
  } catch (err) {
    logger.statusError('Error creating required folders structure');
    // if (err) logger.error(err.stderr);
    errorExit(err);
  }
  logger.statusDone('Creating required folders structure');
}
