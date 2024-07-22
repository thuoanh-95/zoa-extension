import { projectFramework } from "../../../config/constant";
import indent from "../utils/indent";

export default function generateIndex(options) {
  const { framework, name } = options;
  const srcFolder = "/src/";

  const rootContent = "";
  let scripts = "";

  if (framework === projectFramework.REACT) {
    scripts = `
    <!-- built script files will be auto injected -->
   <script type="module" src="${srcFolder}/index.js"></script>
    `.trim();
  }

  if (framework === projectFramework.REACT_TYPESCRIPT) {
    scripts = `
    <!-- built script files will be auto injected -->
   <script type="module" src="${srcFolder}/index.ts"></script>
    `.trim();
  }

  return indent(
    0,
    `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    
      <meta name="format-detection" content="telephone=no">
      <meta name="msapplication-tap-highlight" content="no">
      <title>${name || "ZOA Extensions"}</title>
    </head>
    <body>
      <div id="app">${rootContent}</div>
      ${scripts}
    </body>
    </html>
    `
  ).trim();
}
