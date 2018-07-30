const merge = require('webpack-merge');
// const style = require('./style');
const app = require('./app');
const worker = require('./worker');

const watchOptions = {
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
};

module.exports = [
    // merge(style, watchOptions),
    // merge(worker, watchOptions),
    merge(app, watchOptions),
];
