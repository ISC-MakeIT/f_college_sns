const path = require('path');
const merge = require('webpack-merge');
const common = require('./ts.common');
const Dotenv = require('dotenv-webpack');

const sourcedir = path.join(__dirname, '../', 'src', 'typescripts');
const targetdir = path.join(__dirname, '../', 'public', 'assets');

module.exports = merge(common, {
    entry: {
        app: path.join(sourcedir, 'app.tsx'),
    },
    output: {
        path: targetdir,
        filename: '[name].js',
    },
    plugins: [
        new Dotenv()
    ],
});
