const path = require('path');
const merge = require('webpack-merge');
const common = require('./ts.common');

const sourcedir = path.join(__dirname, '../', 'src', 'typescripts');
const targetdir = path.join(__dirname, '../', 'public', 'javascripts');

module.exports = merge(common, {
    entry: {
        app: path.join(sourcedir, 'app.tsx'),
    },
    output: {
        path: targetdir,
        filename: '[name].js',
    },
});
