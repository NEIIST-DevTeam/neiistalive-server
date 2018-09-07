'use strict';

module.exports = {
	mailman: {
		host: 'https://mlists.ist.utl.pt/mailman',
		group1: 'password',
		group2: 'password',
	},
	trello: {
		apiKey: '8d922d11bf9de738d1458a80809e9fc0',
		token: 'a640e73eb187aab557d8b80189d1f4aae2c36ff230a07766b3eddc0036f2e7a6',
		organizationID: '5a3ac1caccd0f209b01f024b',
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
