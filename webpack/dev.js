const merge = require('webpack-merge');
const path = require('path');
const style = require('./style');
const app = require('./app');

const watchOptions = {
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
        devServer: {
            contentBase: path.resolve(__dirname, '../', 'public'),
            compress: true,
            historyApiFallback: true,
            port: 3333,
    },
};

module.exports = [
    merge(style, watchOptions),
    merge(app, watchOptions),
];
