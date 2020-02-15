const path = require('path');

const dotenv = require('dotenv');
const expand = require('dotenv-expand');

const dotEnvExpand = (type) => {
  const envs = dotenv.config({
    path: path.resolve(__dirname, `../../../.env.${type}`),
  });

  if (envs.error) {
    throw envs.error;
  }

  expand(envs);
};

module.exports = {
  dotEnvExpand,
};
