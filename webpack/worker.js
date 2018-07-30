const path = require('path');
const merge = require('webpack-merge');
const common = require('./ts.common');

const sourceDir = path.join(__dirname, '../', 'src', 'typescripts');
const targetDir = path.join(__dirname, '../', 'public');

module.exports = merge(common, {
    entry: {
        worker: path.join(sourceDir, 'worker.ts'),
        'firebase-messaging-sw': path.join(sourceDir, 'firebase-messaging-sw.ts'),
    },
    output: {
        path: targetDir,
        filename: '[name].js',
    },
});
