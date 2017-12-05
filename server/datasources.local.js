'use strict';

const config = require('../config.js');

module.exports = {
	'mongoDB': {
		'connector': 'mongodb',
		'host': config.mongo.host,
		'port': config.mongo.port,
		'url': config.mongo.url,
		'database': config.mongo.database,
		'password': config.mongo.password,
		'name': 'mongoDB',
		'user': config.mongo.user,
		'allowExtendedOperators': true,
	},
};
