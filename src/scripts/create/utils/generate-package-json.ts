import { generateNpmScripts } from "./generate-npm-scripts";

export default function generatePackageJson(options: any) {
  const { framework, name } = options;

  const dependencies = [];
  const dependenciesReact = ["react", "react-dom", "react-router-dom"];

  dependencies.push(...dependenciesReact);

  const devDependencies = [
    "@vitejs/plugin-react@4.2.1",
    "autoprefixer@10.4.19",
    "postcss@8.4.38",
    "vite@5.2.11",
  ];
  if (framework === "react-typescript") {
    devDependencies.push("@types/react", "@types/react-dom");
  }

  // Scripts
  const scripts: any = {};
  generateNpmScripts().forEach((s) => {
    scripts[s.name] = s.script;
  });
  const postInstall = [];

  if (postInstall.length) {
    scripts.postinstall = postInstall.join(" && ");
  }

  // Content
  const content = `
   {
     "name": "${name
       .toLowerCase()
       .replace(/[ ]{2,}/, " ")
       .replace(/ /g, "-")}",
     "private": true,
     "version": "1.0.0",
     "description": "${name}",
     "repository" : "",
     "license" : "UNLICENSED",
     "browserslist": [
       "Android >= 5",
       "IOS >= 9.3",
       "Edge >= 15",
       "Safari >= 9.1",
       "Chrome >= 49",
       "Firefox >= 31",
       "Samsung >= 5"
     ],
     "scripts" : ${JSON.stringify(scripts)},
     "dependencies": {},
     "devDependencies": {}
   }
   `.trim();

  return {
    content,
    dependencies,
    devDependencies,
    postInstall,
  };
}
