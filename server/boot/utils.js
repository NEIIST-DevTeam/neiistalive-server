'use strict';

module.exports = function(app) {
	app._config = require('../../config.js');
	app.config = function(property) {
		let props = property.split('.');
		let obj = app._config;
		while (props.length > 1) {
			let prop = props.shift();
			if (!obj[prop]) throw new app.error('INVALID_PROPERTY');
			obj = obj[prop];
		}
		let prop = props.shift();
		if (!obj[prop]) throw new app.error('INVALID_PROPERTY');
		return obj[prop];
	};

	// Todo
	// app.errors = require('../../errors.js');
	app.errors = {};
	app.error = function(id) {
		let error = new Error();
		error.safeError = true;
		if (app.errors[id]) {
			error.status = app.errors[id].status;
			error.message = app.errors[id].message;
			error.code = id;
		}		else {
			error.status = 500;
			error.message = 'Unknown';
			error.code = id;
		}
		return error;
	};
	app.safeError = function(err) {
		let error = new Error(err);
		error.safeError = true;
		return error;
	};
	app.message = function(id) {
		return app.errors[id] || 'Unknown';
	};
};
