const path = require('path');

module.exports = {
  mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'breadroll.js',
    path: path.resolve(__dirname, '.dist'),
    libraryTarget: 'var',
    libraryExport: 'Breadroll', // Assigns the 'Breadroll' class as the exported object. https://webpack.js.org/configuration/output/#outputlibraryexport
    globalObject: 'this',
    library: 'Breadroll' // Name given to the exported object
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