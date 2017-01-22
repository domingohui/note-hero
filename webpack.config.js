var path = require('path');
var webpack = require('webpack');

const STATIC_PATH = './public/';
module.exports = {
      entry: STATIC_PATH + 'scripts/index.js',
      output: { path: __dirname, filename: STATIC_PATH + 'bundled_frontend.js',  publicPath: './public/assets/'},
      module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, STATIC_PATH + 'scripts'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { 
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            },
            { 
                test: /\.jpg$/, 
                loader: "file-loader!./public/generated_img/file.jpg" 
            },

            { 
                test: /\.json$/, 
                loader: "json-loader" 
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/generated_fonts/[name].[ext]'
            }
        ]
    }
};
