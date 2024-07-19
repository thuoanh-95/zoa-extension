import qrcode from "qrcode-terminal";

import { axiosClient } from "../../utils/axios";
import logSymbols from "log-symbols";
import chalk from "chalk";
import { text } from "../../utils/log";
import { getEnv, setEnv } from "../../utils/env";
import ora from "ora";
import config from "../../config";

const waitText = chalk.gray("Waiting login...");
const spinner = ora(waitText);
const authPath = `${config.api_domain}/api/auth`;

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchQRCode(url, appId) {
  try {
    const response = await axiosClient.get(`${url}/qrcode?app_id=${appId}`);
    const qrData = response.data.data?.urlDecode;

    await generateQRCode(qrData);
    await checkLogin(url);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

function generateQRCode(qrData) {
  qrcode.generate(qrData, { small: true }, function (qrcode) {
    const qrCode = `${logSymbols.info} ${chalk.bold(`Scan the QR code with Zalo App:\n${qrcode}`)}`;
    text(qrCode);
  });
}

async function checkLogin(url, attempts = 0) {
  if (attempts >= 60) {
    ora(chalk.gray("Maximum attempts reached."));
    return;
  }

  try {
    const response = await axiosClient.get(
      `${url}/check-login?app_id=${getEnv(config.env.appId)}`
    );

    const result = response.data;
    if (result.error_code === 0 && result?.data?.accessToken) {
      console.log("Login Success!");
      setEnv("ZOA_TOKEN", result?.data?.accessToken);
    } else {
      await delay(1000);
      await checkLogin(url, attempts + 1);
    }
  } catch (error) {
    if (attempts < 60) {
      await delay(1000);
      await checkLogin(url, attempts + 1);
    }
  }
}

export async function loginApp(options: any, logger?: any) {
  if (!logger) {
    logger = {
      statusStart() {},
      statusDone() {},
      statusText() {},
      statusError() {},
      text() {},
      error() {},
    };
  }

  logger.statusStart(waitText);
  spinner.start();

  const loginMethod = options.loginMethod;
  const appId = options.appId || getEnv(config.env.appId);
  const token = options.token;

  try {
    spinner.start();

    if (loginMethod === "Zalo") {
      await fetchQRCode(authPath, appId);
      logger.statusDone("Login Success!");

      return Promise.resolve();
    }
  } catch (err) {
    console.error("Error occurred:", err);
    logger.statusError("Login fail!")
    throw err;
  } finally {
    spinner.stop();
  }
}
