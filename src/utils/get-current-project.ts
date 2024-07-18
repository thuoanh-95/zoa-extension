import path from "path";
import fs from "fs";
import config from "../config";

export default function (cwd) {
  let currentProject;
  try {
    // eslint-disable-next-line
    currentProject = fs.existsSync(
      path.resolve(cwd, config.filename.zoaConfig)
    );
    console.log("currentProject", currentProject);
  } catch (err) {
    // all good
  }
  if (!currentProject) {
    try {
      // eslint-disable-next-line
      currentProject =fs.existsSync(path.resolve(cwd, "package.json")) ;
    } catch (err) {
      // all good
    }
  }
  if (!currentProject) return undefined;
  return {
    cwd,
    ...(currentProject || {}),
  };
}
