const config = {
	apollo: {
		clientConfigs: {
			default: {
				httpEndpoint: 'https://barataclub.herokuapp.com/v1alpha1/graphql',
			},
		},
		errorHandler(error) {
			console.log(
				'%cError',
				'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
				error.message,
			);
		},
	},
};

module.exports = config.apollo;
