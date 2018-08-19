const merge = require('webpack-merge');
const style = require('./style');
const app = require('./app');

const watchOptions = {
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname),
        // contentBase: path.join(__dirname, '../', 'index.html'),
        publicPath: '/',
        compress: true,
        historyApiFallback: true,
        open: true,
        port: 3000,
        hot: true,
        inline: true
    },
};

module.exports = [
    merge(style, watchOptions),
    merge(app, watchOptions),
];
