const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/index.ts',
    output: {
        filename: "./js/app.js",
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json'
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {config: {path: 'webpack-config/postcss.config.js'}}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {config: {path: 'webpack-config/postcss.config.js'}}
                    },
                    'sass-loader'
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins :[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
};