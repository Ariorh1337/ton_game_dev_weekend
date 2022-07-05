const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { InjectManifest } = require('workbox-webpack-plugin');

const timestamp = Date.now();

const prod = {
	mode: 'production',
	stats: 'errors-warnings',
	output: {
		filename: `[name].[contenthash].${timestamp}.bundle.js`,
		chunkFilename: `[name].[contenthash].${timestamp}.chunk.js`
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					filename: `[name].[contenthash].${timestamp}.bundle.js`
				}
			}
		}
	},
	plugins: [
		new InjectManifest({
			swSrc: path.resolve(__dirname, '../pwa/sw.js'),
			swDest: 'sw.js'
		})
	]
}

module.exports = merge(common, prod)
