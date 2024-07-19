import fs from 'fs';
import path from 'path';


export default function findFilesByExt(
  folderPath,
  extension = ["jsx", "tsx", "vue"]
) {
  var files = fs.readdirSync(folderPath);
  var result = [];
  files.forEach(function (file) {
    var newbase = path.join(folderPath, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = [...result, ...findFilesByExt(newbase, extension)];
    } else {
      const fileExt = file.substr(file.lastIndexOf(".") + 1);
      const fileName = file.substr(0, file.lastIndexOf("."));
      if (extension.includes(fileExt)) {
        result.push({
          fileName,
          ext: fileExt,
          folderPath,
        });
      }
    }
  });
  return result;
}
