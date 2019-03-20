const path = require("path")
const uglify = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "production",
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
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
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
        new uglify(),
        new htmlPlugin ({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost",
        compress: true,
        port: 18080
    }
}