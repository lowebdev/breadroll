const path = require('path');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'breadroll.js',
		path: path.resolve(__dirname, '.dist')
	},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  }
};