module.exports = api => {
  api.cache(false);
  return {
    presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env'],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  };
};
