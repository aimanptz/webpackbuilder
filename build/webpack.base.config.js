const path                 = require('path'),
			MiniCssExtractPlugin = require('mini-css-extract-plugin'),
			CopyWebpackPlugin    = require('copy-webpack-plugin'),
			HtmlWebpackPlugin    = require('html-webpack-plugin'),
			SpriteLoaderPlugin   = require('svg-sprite-loader/plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
	},
	// output: {
	//   filename: `js/[name].js`,
	//   path: PATHS.dist,
	//   publicPath: './'
	// },
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.(png|jpe?g|webp|svg)$/i,
			include: '/src/assets/img/',
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: `${PATHS.assets}img`
					}
				},
			]
		}, {
			test: /\.svg$/,
			loader: 'svg-sprite-loader',
			options: {
				extract: true,
				spriteFilename: `${PATHS.assets}svg/sprite.svg`
			}
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: `${PATHS.assets}fonts`
					}
				}
			]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {sourceMap: true}
				},
				{
					loader: 'postcss-loader',
					options: {sourceMap: true, config: {path: `${PATHS.src}/js/postscc.config.js`}}
				},
				{
					loader: 'sass-loader',
					options: {sourceMap: true}
				}
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/[name].css`
		}),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new CopyWebpackPlugin([
			{from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
			{from: `${PATHS.src}/static`, to: ''},
			{from: `${PATHS.src}/views`, to: './views'},
		]),
		new SpriteLoaderPlugin({
			plainSprite: true
		}),
	],
};
