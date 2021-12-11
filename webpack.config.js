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
            '/Chart/**': {
                target: 'https://www.solarweb.com',
                logLevel: 'debug',
                changeOrigin: true,
                headers: {
                    "Cookie": "__RequestVerificationToken=11V47wGE8oONXA5F7i5HEzs8IRwEqJpkx1UjF02KUgUc2Qe2Di7jfY_03lJZPulBpozfcr8Xav_FsUYQHAhU5SV8puM1; CookieConsent={stamp:%27hFCIB9JFIQZ9sCk98tnsvQNRtbJ8V8hkzeOSQuhC77O2JLABSHsUUg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1636038840654%2Cregion:%27es%27}; _ga=GA1.2.2053894841.1636038841; lbc=!9cd0a0MqYUtvqe7NCu9HaYk4fFUj7RK9WTPzvXN1VajdOMs8vPV6MahJTirke2PxFPsoMhmD5Myib29/55W5B4nrGL8F8EKv3ndtcYbU9yY=; TimeFormat=HH:mm; Culture=en; DateFormat=DD/MM/YYYY; _gid=GA1.2.335005437.1638786453; .AspNet.Auth=P0JZFiq_9QCHAOXj7iPVV8vaIEEvSWscBFNsb79eW9JattsPls6b_k2bGwa97By2PKsPGv9jvrkq9FXsIdnrS9EB8k6eEmPuz8IVr8ZmhTokGvN5zV1BdeLbd1Ie15fX7ewKLYIekdBHKJ_iPOba4yL6pC13dh5jytFhlNirFouYxjMrYLEBUYm0NItc13c-R2zOUc9YDfkM1ezHHGO3yU_N01O4BqtpNuN42-dU02gVv2DfMMYfpUvd-zNpO5tGUWrzaGbBgnfhmoWkv-egOcVU1e__ZBrJRzfVhJjL-bMv4G4uXmcZLb--umwx5JCA45vZ5oF6hERP8Mcou4-WDBU6UxeArCEfzu2ojnzMGcuFNqHYNtA6yhstEXWRfbheoUA2lEbi-p9i8-CkQ2E4vlvY1gHGI2SY7EQ7aV9liE8IumsAbBOsKEEk0awga1dO2aKMEqYnXxDD4Gie_D3oBXfAoTvjr4TcS3mSsOZJPSRCgL6Y; TS01329c72=015bdaa268f09f06c6b446b382603cd7e6f29b908d6935a83199d67af85a606336f301f0fe8c7d2f64bf8b4e894784b4802e6465cd; _gat_UA-77255390-2=1",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                    "Connection": "keep-alive"
                }
            }
        },
        headers: {},
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
