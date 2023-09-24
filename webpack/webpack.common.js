const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ProvidePlugin = require('webpack').ProvidePlugin;

module.exports = {
	entry: ["./src/scripts/game/index.ts"],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: ["node_modules", "src"],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			'game': path.resolve(__dirname, '../src/scripts/game'),
			'util': path.resolve(__dirname, '../src/scripts/util')
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$|\.jsx?$/,
				include: path.join(__dirname, '../src'),
				loader: 'ts-loader'
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					filename: '[name].bundle.js'
				}
			}
		}
	},
	plugins: [
		new ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
		new HtmlWebpackPlugin({
			gameName: 'Template',
			template: 'src/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/assets', to: 'assets' },
				{ from: 'src/favicon.ico', to: '' }
			]
		})
	]
}
