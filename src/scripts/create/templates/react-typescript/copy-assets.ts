import path from "path";
import generateScripts from "./generate-scripts";
import generateRoot from "./generate-root";
import generateVite from "./generate-vite";
import generateTsConfig from "./generate-ts-config";

export default function (options: any) {
  const cwd = options.cwd || process.cwd();
  const toCopy = [];

  toCopy.push({
    content: generateScripts(options),
    to: path.resolve(cwd, "src", "index.ts"),
  });

  toCopy.push({
    content: generateRoot(options),
    to: path.resolve(cwd, "src", "components", "App.tsx"),
  });

  toCopy.push({
    content: generateVite(options),
    to: path.resolve(cwd, "vite.config.mts"),
  });

  toCopy.push({
    content: generateTsConfig(),
    to: path.resolve(cwd, "tsconfig.json"),
  });

  return toCopy;
}
