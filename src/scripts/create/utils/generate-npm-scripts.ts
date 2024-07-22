import npmScripts from "./npm-scripts";

export  const generateNpmScripts = (tokens = ['s', 'r']) => {
  return tokens.map((token) => {
    return {
      icon: npmScripts.default[token].icon,
      name: npmScripts.default[token].name,
      script: npmScripts.default[token].script,
      description: npmScripts.default[token].description,
    };
  });
};
