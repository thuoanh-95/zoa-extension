/* eslint no-param-reassign: ["off"] */

import inquirer from "inquirer";
import config from "../../config";
import { getEnv } from "../../utils/env";

function getLoginOptions() {
  const questions = [
    {
      type: "input",
      name: "appId",
      message: "Zalo App ID:",
      when: () =>
        !getEnv(config.env.appId) || getEnv(config.env.appId) === undefined,
      validate(input) {
        return new Promise((resolve, reject) => {
          if (!input) reject(new Error("Zalo App ID is required"));
          else resolve(true);
        });
      },
    },
    {
      type: "list",
      name: "loginMethod",
      message: "Choose a Login Method",
      choices: [
        {
          name: "1. Login via QR code with Zalo App",
          value: "Zalo",
        },
        {
          name: "2. Login with App Access Token",
          value: "accessToken",
        },
      ],
      validate(input) {
        return new Promise((resolve, reject) => {
          if (!input || !input.length)
            reject(new Error("Login method is required!"));
          else resolve(true);
        });
      },
    },
    {
      type: "input",
      name: "token",
      message: "Zalo Access Token:",
      when: (opts) => opts.loginMethod === "accessToken",
      validate(input) {
        return new Promise((resolve, reject) => {
          if (!input) reject(new Error("Zalo Access Token is required"));
          else resolve(true);
        });
      },
    },
  ];
  return inquirer.prompt(questions).then((options) => {
    return Promise.resolve(options);
  });
}

export default getLoginOptions;
