'use strict';

const app = require('../server');
const Integration = require('./Integration.class.js');
const Api = require('mailman2-node-wrapper');

class Mailman extends Integration {
	constructor(config) {
		this.config = config;
		if (!config.host) {
			throw new app.error('Invalid configuration for Mailman integration');
		}
	}

	async init() {
		return true;
	}

	async addUser(user) {
		return true;
	}

	async removeUser(user) {
		return true;
	}

	async grant(users, group) {
		const emails = this.coerce(users);

		if (this.config[group]) {
			const api = new Api(this.config.host, group);
			await api.login(this.config[group]);
			if (!await api.subscribe(emails, false, false)) {
				// Todo: log error
				throw new app.error('Error subscribing user in Mailman');
			}
		}
		throw new app.error('Invalid configuration for Mailman\'s group ' + group);
	}

	async deny(users, group) {
		const emails = this.coerce(users);

		if (this.config[group]) {
			const api = new Api(this.config.host, group);
			await api.login(this.config[group]);
			if (!await api.unsubscribe(emails, false, false)) {
				// Todo: log error
				throw new app.error('Error unsubscribing user in Mailman');
			}
		}
		throw new app.error('Invalid configuration for Mailman\'s group ' + group);
	}

	coerce(users) {
		if (!users) throw new app.error('Invalid user supplied to Mailman');
		if (!Array.isArray(users)) users = [users];
		return users.map(user => user.email);
	}
}

module.exports = Mailman;
