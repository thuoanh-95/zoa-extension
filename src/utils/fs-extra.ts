import fs from "fs";
import path from "path";

const fse = {
  createReadStream(p) {
    return fs.createReadStream(p);
  },
  unlinkSync(p) {
    return fs.unlinkSync(p);
  },
  existsSync(p) {
    return fs.existsSync(p);
  },
  readdirSync(dir) {
    return fs.readdirSync(dir);
  },
  mkdirSync(dir) {
    if (fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      return;
    }
    dir.split(path.sep).forEach((part, index) => {
      if (!part) return;
      const partialPath = dir
        .split(path.sep)
        .slice(0, index + 1)
        .join(path.sep);
      if (!fs.existsSync(partialPath)) {
        fs.mkdirSync(partialPath);
      }
    });
  },
  readFileSync(file, charset?: any) {
    return fs.readFileSync(file, charset || "utf8");
  },
  writeFileSync(file, content = "") {
    if (!fs.existsSync(path.dirname(file))) {
      fse.mkdirSync(path.dirname(file));
    }
    return fs.writeFileSync(file, content);
  },
  writeFileAsync(file, content = "") {
    if (!fs.existsSync(path.dirname(file))) {
      fse.mkdirSync(path.dirname(file));
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(file, content, (err) => {
        if (err) reject();
        else Promise.resolve();
      });
    });
  },
  copyFileSync(src, dest) {
    if (!fs.existsSync(path.dirname(dest))) {
      fse.mkdirSync(path.dirname(dest));
    }
    fs.copyFileSync(src, dest);
  },
  copyFileAsync(src, dest) {
    if (!fs.existsSync(path.dirname(dest))) {
      fse.mkdirSync(path.dirname(dest));
    }
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, (err) => {
        if (err) reject(err);
        else Promise.resolve();
      });
    });
  },
  removeDirSync(path) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);

      if (files.length > 0) {
        files.forEach(function (filename) {
          if (fs.statSync(path + "/" + filename).isDirectory()) {
            fse.removeDirSync(path + "/" + filename);
          } else {
            fs.unlinkSync(path + "/" + filename);
          }
        });
        fs.rmdirSync(path);
      } else {
        fs.rmdirSync(path);
      }
    }
  },
};

export default fse;
