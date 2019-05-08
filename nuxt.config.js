const apollo = require('./config/apollo.js');

const config = {
	apollo,
	generate: {
		dir: './../dist',
	},
	mode: 'spa',
	plugins: ['~/plugins/app.js', '~/plugins/vuetify.js'],
	modules: ['@nuxtjs/apollo'],
	rootDir: './src',
};

module.exports = config;
