import chalk from "chalk";
import ora from "ora";
import _ from "lodash";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import replace from "@rollup/plugin-replace";
import { getEnv } from "../../utils/env";
import path from "path";
import config from "../../config";
import { error } from "../../utils/log";
import { ConfigArg } from "../../types";
import { build } from "vite";
import generatePagesMap from "../../utils/generate-pages-map";
import fse from "../../utils/fs-extra";

const env = getEnv("NODE_ENV") || "production";

const waitText = chalk.gray("Building... (Please wait, it can take a while)");

const spinner = ora(
  env === "production"
    ? "Building for production..."
    : "Building development version..."
);

const buildTestUrl = (filePath: string, version: string) => {
  const outDir = "www";
  const params = {
    relative_path: "www",
  };
};

export default async function buildApp(
  options?: any,
  logger?: any,
  conf?: ConfigArg
) {
  const cwd = options.cwd || process.cwd();
  const resolvePath = (dir: string) => path.join(cwd, dir);
  const appConfig =
    options.appConfigJson ||
    JSON.parse(fse.readFileSync(resolvePath(config.filename.appConfig)) as any);

  const errorExit = (err) => {
    error(err.stderr || err);
    if (conf.exitOnError) process.exit(1);
  };

  if (!logger) {
    // eslint-disable-next-line
    logger = {
      statusStart() {},
      statusDone() {},
      statusError() {},
      text() {},
      error() {},
    };
  }
  spinner.start();
  logger.statusStart(waitText);

  try {
    const appId = getEnv(config.env.appId);
    // set version
    let nextVersion = options.nextVersion;
    if (!nextVersion) {
      nextVersion = 1;
    }

    let viteConfig = "vite.config.js";

    const res = await build({
      configFile: path.join(cwd, viteConfig),
      root: cwd,
      base: "",
      css: {
        modules: {
          scopeBehaviour: "local",
        },
      },
      mode: options.mode,
      build: {
        target: "es2015",
        outDir: path.join(cwd, "www"),
        assetsInlineLimit: 0,
        cssCodeSplit: false,
        cssTarget: ["es2015", "safari13.1"],
        rollupOptions: {
          plugins: [
            replace({
              values: {
                ZMP_IMPORT_PAGES: () => generatePagesMap(cwd),
              },
            }),
            dynamicImportVars({
              warnOnError: true,
            }),
          ],
          output: {
            entryFileNames: "assets/[name].[hash].module.js",
            chunkFileNames: "assets/[name].[hash].module.js",
          },
        },
      },
      logLevel: "error",
    });

    const output = (res as any).output.map((obj) =>
      _.pick(obj, [
        "fileName",
        "type",
        "imports",
        "isEntry",
        "isImplicitEntry",
        "isDynamicEntry",
      ])
    );

    const outputMap = new Map();
    output.forEach((obj) => {
      outputMap.set(obj.fileName, obj);
    });

    // Entry files, cần đc load sync bằng thẻ script
    const jsFiles = output.filter((file) => {
      return file.type === "chunk" && file.isEntry;
    });

    // Các file cần preload
    const modulePreloadFiles = [];
    const getImportedChunks = (chunk, seen = new Set()) => {
      const chunks = [];
      chunk.imports.forEach((file) => {
        const importee = outputMap.get(file);
        if (importee?.type === "chunk" && !seen.has(file)) {
          seen.add(file);
          chunks.push(...getImportedChunks(importee, seen));
          chunks.push(importee);
        }
      });
      return chunks;
    };
    jsFiles.forEach((file) => {
      const chunks = getImportedChunks(file);
      modulePreloadFiles.push(...chunks);
    });

    const cssFiles = output.filter((file) => {
      if (file.type !== "asset" || !file.fileName.endsWith(".css"))
        return false;
      // const name = file.fileName.replace(/\.([a-z0-9]{8})\.css$/, '');
      // if (!jsFiles.find((js) => js.fileName.startsWith(name))) return false;
      return true;
    });
    const appConfigJson = {
      ...appConfig,
      listCSS: [
        ...(Array.isArray(appConfig.listCSS) ? appConfig.listCSS : []),
        ...cssFiles.map((f) => f.fileName),
      ],
      listSyncJS: [
        ...(Array.isArray(appConfig.listSyncJS) ? appConfig.listSyncJS : []),
        ...jsFiles.map((f) => f.fileName),
      ],
      listAsyncJS: [
        ...modulePreloadFiles.map((f) => f.fileName),
        ...(Array.isArray(appConfig.listAsyncJS) ? appConfig.listAsyncJS : []),
      ],
    };
    fse.writeFileSync(
      resolvePath(`www/${config.filename.appConfig}`),
      JSON.stringify(appConfigJson)
    );
    logger.statusDone(`${chalk.bold.green("Build Done!\n")}`);
    return appConfigJson;
  } catch (err) {
    logger.statusError("Error building project");
    // if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }
}
