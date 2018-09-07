'use strict';

module.exports = {
	mailman: {
		host: 'https://mlists.ist.utl.pt/mailman',
		group1: 'password',
		group2: 'password',
	},
	mongo: {
		host: 'mongodb',
		port: 27017,
		url: '',
		database: 'neiistalive',
		connector: 'mongodb',
		allowExtendedOperators: true,
	},
	fenixedu: {
		'fenix_url': 'https://fenix.tecnico.ulisboa.pt/oauth/',
		'api_url': 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/',
		'redirect_url': 'http://localhost:3000/api/members/login-fenixedu',
		'client_id': '',
		'client_secret': '',
	},
};
