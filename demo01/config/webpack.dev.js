const path = require("path")
const glob = require("glob")

const uglify = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")
const cleanWebpackPlugin = require("clean-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "../src/main.js"),
        main2: path.resolve(__dirname, "../src/main2.js")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader" },
                        { loader: "less-loader" }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 500
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin({
            verbose: true,
            dry: false
        }),
        new uglify(),
        new htmlPlugin ({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        }),
        new extractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.resolve(__dirname, '../src/*.html'))
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost",
        compress: true,
        port: 18080
    }
}