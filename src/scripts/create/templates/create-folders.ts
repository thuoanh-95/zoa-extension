import path from "path";
import fse from "../../../utils/fs-extra";

export default function createFolders(options: any) {
  const cwd = options.cwd || process.cwd();

  const srcFolder = "src";

  const folders = [
    `./${srcFolder}`,
    `./${srcFolder}/components`,
    `./${srcFolder}/views`,
  ];

  if (folders.indexOf("./www") < 0) {
    folders.push("./www");
  }

  folders.forEach((f) => {
    if (!fse.existsSync(f)) fse.mkdirSync(path.resolve(cwd, f));
  });
}
