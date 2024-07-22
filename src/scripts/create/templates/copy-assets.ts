import path from "path";
import { projectFramework } from "../../../config/constant";
import copyReactAssets from "./react/copy-assets";
import copyReactTSAssets from "./react-typescript/copy-assets";
import generateIndex from "./generate-index";

export default function (options: any) {
  const cwd = options.cwd || process.cwd();

  const { framework } = options;

  const srcFolder = "src";
  const toCopy = [];

  if (framework === projectFramework.REACT) {
    toCopy.push(...copyReactAssets(options));
  }

  if (framework === projectFramework.REACT_TYPESCRIPT) {
    toCopy.push(...copyReactTSAssets(options));
  }

  toCopy.push({
    content: generateIndex(options),
    to: path.resolve(cwd, "index.html"),
  });

  return toCopy;
}
