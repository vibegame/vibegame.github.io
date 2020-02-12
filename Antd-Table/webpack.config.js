const settings = {
    entry: {
        file: 'index.js',
        directory: 'src'
    },
    output: {
        filename: '[name].[hash].js',
        directory: 'build'
    }
};
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    entry: ["@babel/polyfill", path.join(__dirname, settings.entry.directory, `/index.js`)],
    output: {
        path: path.join(__dirname, settings.output.directory),
        filename: settings.output.filename
    },
    devtool: devMode ? "source-map" : false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode,
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode,
                            importLoaders: 1,
                            modules: {
                                localIdentName: devMode ? "[name]__[local]" : "[hash:base64]", /* [name] - file, [local] - className, [hash:base64:X] - hash with length X */
                            },
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(pcss)$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode,
                            importLoaders: 1,
                            modules: {
                                localIdentName: devMode ? "[name]__[local]" : "[hash:base64]", /* [name] - file, [local] - className, [hash:base64:X] - hash with length X */
                            },
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            ignoreOrder: false
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.pcss', '.sass', '.scss']
    },
};