<h2>#Configuring Webpack</h2>

// Code snippet<br>

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
entry: './src/index.js',
output: {
path: path.resolve(\_\_dirname, 'dist'),
},
plugins: [
new MiniCssExtractPlugin(),
new HtmlWebpackPlugin({
template: './index.html',
}),
],
module: {
rules: [
{
test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
type: 'asset',
},
],
},
};

module.exports = () => {
if (isProduction) {
config.mode = 'production';

    } else {
        config.mode = 'development';
    }
    return config;

};
1
