var path = require('path');
var webpack = require('webpack');

module.exports = {
      entry: './public/scripts/index.js',
      output: { path: __dirname, filename: './public/frontend.js',  publicPath: './public/assets/'},
      module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'public/scripts'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.json$/, loader: "json-loader" }
        ]
    }
};
