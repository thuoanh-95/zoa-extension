import path from "path";
import normalizePath from "normalize-path";
import findFilesByExt from "./find-files-by-ext";

export default (cwd) => {
  const pagesDir = path.resolve(cwd, `src${path.sep}pages`);
  const files = findFilesByExt(pagesDir);
  const objectEntries = files.map(({ fileName, folderPath, ext }) => {
    const fileDir = path
      .join(folderPath, fileName)
      .replace(`${pagesDir}${path.sep}`, "");
    const fileDirNormalized = normalizePath(fileDir);
    const filePath = normalizePath(path.join(folderPath, `${fileName}.${ext}`));
    return `"${fileDirNormalized}" : () => import("${filePath}")`;
  });
  return `{${objectEntries.join(",")}}`;
};
