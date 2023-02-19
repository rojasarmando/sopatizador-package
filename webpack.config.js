const path = require('path');
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    // library: 'Spzdor',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    filename: 'sopatizador.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: [['@babel/preset-env']] },
        },
      },
    ],
  },
};
