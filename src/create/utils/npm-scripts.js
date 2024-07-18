const map = {
  d: "dev",
  p: "prod",
  s: "start",
  v: "serve",
  r: "deploy",
  t: "build:css",
};
function scriptName(tokens) {
  return tokens
    .split("_")[0]
    .split("")
    .map((token) => map[token])
    .join("-");
}

const npmScripts = {
  default: {
    s: {
      icon: "🔥",
      script: "zmp start",
      description: "run development server",
    },
    r: {
      icon: "🙏",
      script: "zmp deploy",
      description: "deploy mini app for production",
    },
  },
  httpServer: {
    v: {
      icon: "🔧",
      script: "http-server ./www/ -o -c 1 -a localhost -p 8080",
      description: "run development server",
    },
    s: {
      icon: "🔥",
      script: "npm run serve",
      description: "run development server",
    },
  },
  tailwind: {
    t: {
      icon: "🔧",
      script: "postcss src/css/tailwind.css -o src/css/styles.css",
      description: "build tailwind css",
    },
  },
};

Object.keys(npmScripts.default).forEach((tokens) => {
  npmScripts.default[tokens].name = scriptName(tokens);
});
Object.keys(npmScripts.httpServer).forEach((tokens) => {
  npmScripts.httpServer[tokens].name = scriptName(tokens);
});

Object.keys(npmScripts.tailwind).forEach((tokens) => {
  npmScripts.tailwind[tokens].name = scriptName(tokens);
});

export default npmScripts;
