const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: [
          /node_modules/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ], ["@babel/plugin-transform-react-jsx"],
              ["@babel/plugin-syntax-jsx"]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
          loader: 'style-loader',
          },
          {
          loader: 'css-loader',
            options: {
             importLoaders: 1,
             modules: true,
            }
          },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
};
