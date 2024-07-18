import { parse, stringify } from "envfile";

import config from "../config";
import fse from "./fs-extra";

/**
 * Function to get value from env
 * @param {string} key
 *
 */
export function getEnv(key) {
  const value = process.env[key];
  if (value) return value;
  const rootENV = config.root_env();
  const exists = fse.existsSync(rootENV);
  if (!exists) return undefined;
  const data = fse.readFileSync(rootENV, "utf8");
  const result = parse(data as any);
  return result[key];
}

/**
 * Function to set environment variables.
 * @param {string} key
 * @param {string} value
 *
 */
export function setEnv(key, value) {
  const rootENV = config.root_env();
  if (!fse.existsSync(rootENV)) {
    fse.writeFileSync(rootENV, stringify({ [key]: value }));
  } else {
    const data = fse.readFileSync(rootENV, "utf8");
    let result = parse(data as any);
    result[key] = value;
    fse.writeFileSync(rootENV, stringify(result));
  }
}
