const merge = require('webpack-merge');
const style = require('./style');
const app = require('./app');
const webpack = require('webpack');

const prodConfig = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};

module.exports = [
    style,
    merge(app, prodConfig),
];
