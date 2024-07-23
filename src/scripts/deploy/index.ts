import chalk from "chalk";
import zipper from "zip-local";
import crypto from "crypto";
import FormData from "form-data";

import { ConfigArg } from "../../types";
import config from "../../config";
import path from "path";
import { getEnv } from "../../utils/env";
import { axiosClient } from "../../utils/axios";

const waitText = chalk.gray("(Please wait, it can take a while)");

const defaultLogger = {
  statusStart() {},
  statusDone() {},
  statusText() {},
  statusError() {},
  text() {},
  error() {},
  showOnUI() {},
};

function calculateMD5(input) {
  // Create a hash object using MD5 algorithm
  const hash = crypto.createHash("md5");
  // Update the hash object with the input string
  hash.update(input);
  // Calculate the MD5 digest and convert it to hexadecimal representation
  return hash.digest("hex");
}

async function uploadChunk(data, filename, option = {}, headers = {}) {
  let md5 = calculateMD5(data);
  const formData = new FormData();
  formData.append("file", data, {
    contentType: "application/octet-stream",
    filename: filename,
  } as any);
  formData.append("checksum", md5);
  for (const [key, value] of Object.entries(option)) {
    formData.append(key, value as any);
  }

  console.log(formData);
  return await axiosClient.post(
    config.api_domain + "/api/app-versions/deploy",
    formData,
    {
      headers,
    }
  );
}

export default async function deployApp(
  options: any,
  logger?: any,
  conf?: ConfigArg
) {
  const cwd = options.cwd || process.cwd();
  const outputDir = options.outputDir || "www";
  const apiDomain = config.api_domain;
  const description = options.description || "";

  const resolvePath = (dir) => {
    return path.join(cwd, dir);
  };
  function errorExit(err) {
    logger.error(err.stderr || err);
    if (conf?.exitOnError) process.exit(1);
  }

  const token = getEnv(config.env.token);
  const appConfigFilename = config.filename.appConfig;
  const packageJsonFilename = config.filename.packageJson;

  logger.statusStart(`Deploying Your App ${waitText}`);
  try {
    const buffer = await new Promise((resolve, reject) => {
      zipper.zip(resolvePath(outputDir), function (zipError, zipped) {
        if (zipError) return reject(zipError);
        zipped.compress();
        return resolve(zipped.memory());
      });
    });
    const options = {
      app_id: getEnv(config.env.appId),
      type: "source",
      comment: "comment",
      project: "extension",
      description,
    };

    await uploadChunk(buffer, "public.zip", options, {
      Authorization: `Bearer ${getEnv(config.env.token)}`,
    });
  } catch (err) {
    console.log(err.response);
    logger.statusError("Error deploying your app");
    errorExit(err);
  }
}
