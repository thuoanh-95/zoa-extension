const npmScripts = require('./npm-scripts');

const generateNpmScripts = (tokens = ['s', 'r']) => {
  return tokens.map((token) => {
    return {
      icon: npmScripts.default[token].icon,
      name: npmScripts.default[token].name,
      script: npmScripts.default[token].script,
      description: npmScripts.default[token].description,
    };
  });
};

const generateTailWindScripts = (tokens = ['t']) => {
  return tokens.map((token) => {
    return {
      icon: npmScripts.tailwind[token].icon,
      name: npmScripts.tailwind[token].name,
      script: npmScripts.tailwind[token].script,
      description: npmScripts.tailwind[token].description,
    };
  });
};

module.exports = generateNpmScripts;
module.exports.generateTailWindScripts = generateTailWindScripts;
