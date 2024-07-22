import path from "path";
import { projectFramework } from "../../../config/constant";
import copyAsset from "./react/copy-assets";
import generateIndex from "./generate-index";

export default function (options: any) {
  const cwd = options.cwd || process.cwd();

  const { framework } = options;

  const srcFolder = "src";
  const toCopy = [];

  if (framework === projectFramework.REACT) {
    toCopy.push(...copyAsset(options));
  }

  toCopy.push({
    content: generateIndex(options),
    to: path.resolve(cwd, "index.html"),
  });

  return toCopy;
}
