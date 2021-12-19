const { join, resolve} = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TMP_FOLDER = join(__dirname, "public");

module.exports = () => ({
    mode: "development",
    entry: [resolve(__dirname, 'src', 'index.tsx')],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    output: {
        pathinfo: false
    },
    optimization: {
        usedExports: true,
        sideEffects: true,
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.?js$/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: TMP_FOLDER,
        host: '0.0.0.0',
        port: 4200,
        historyApiFallback: true,
        stats: 'normal',
        proxy: {
            '/solar_api/**': {
                target: 'http://192.168.1.139',
                logLevel: 'debug',
                changeOrigin: true,
                headers: {
                    "Connection": "keep-alive"
                }
            },
            '/solar_data/**': {
                target: 'http://localhost:3000',
                logLevel: 'debug',
                changeOrigin: true,
                headers: {
                    "Connection": "keep-alive"
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "my-app",
            base: {
                href: '/'
            },
            template: 'index.html'
        })
    ]
});
