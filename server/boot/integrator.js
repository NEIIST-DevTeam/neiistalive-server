'use strict';

const Integrations = require('../integrations');

module.exports = function(app) {
	const _integrations = {};
	Object.keys(Integrations).forEach(name => {
		_integrations[name.toLowerCase()] = Integrations[name];
	});

	app.integrations = {
		getIntegration: async (name) => {
			name = name.toLowerCase();
			const instance = new _integrations[name](app.config(name));
			return await instance.init();
		},

		exists: (name) => {
			return !!_integrations[name.toLowerCase()];
		},
	};
};
