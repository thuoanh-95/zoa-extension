import path from "path";
import generateScripts from "./generate-scripts";
import generateRoot from "./generate-root";
import generateVite from "./generate-vite";

export default function (options: any) {
  const cwd = options.cwd || process.cwd();
  const toCopy = [];

  toCopy.push({
    content: generateScripts(options),
    to: path.resolve(cwd, "src", "index.js"),
  });

  toCopy.push({
    content: generateRoot(options),
    to: path.resolve(cwd, "src", "components", "App.jsx"),
  });

  toCopy.push({
    content: generateVite(options),
    to: path.resolve(cwd, "vite.config.mjs"),
  });

  return toCopy;
}
