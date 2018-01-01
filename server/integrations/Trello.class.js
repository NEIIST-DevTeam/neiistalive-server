'use strict';

const app = require('../server');
const Integration = require('./Integration.class.js');
const Api = require("node-trello");

class Trello extends Integration {
	constructor(config) {
		super(config);
		this.config = config;
		if (!config.apiKey || !config.token) {
			throw new app.error('Invalid configuration for Trello integration');
		}
	}

	async init() {
		return true;
	}

	async addUser(user) { // add user to organization 
		const api = new Api(this.config['apiKey'], this.config['token']); // FIXME token must be previously obtained for the
																		  // trello bot account. to get one: https://trello.com/1/connect?key=<PUBLIC_KEY>&name=MyApp&response_type=token
		api.put("/1/organizations/" + this.config['organizationID'] + "/members", 
			{email: user.email, fullName: user.fullName}, function(err, data) { // FIXME add email field in member.json
			if (err) throw err;
		});
		return true;
	}

	async removeUser(user) { // remove user from organization 
		const api = new Api(this.config['apiKey'], this.config['token']);
		api.del("/1/organizations/" + this.config['organizationID'] + "/members/" + user.trelloID, function(err, data) { // FIXME add trelloID field to member
			if (err) throw err;
		});
		return true;
	}

	async grant(users, group) { // add user to board
		const api = new Api(this.config['apiKey'], this.config['token']);
		api.put("/1/boards/" + group.trelloID + "/members", // FIXME add trelloID field to group
			{email: user.email}, function(err, data) {
			if (err) throw err;
		});
		return true;
	}

	async deny(users, group) { // remove user from board
		const api = new Api(this.config['apiKey'], this.config['token']);
		api.del("/1/boards/" + group.trelloID + "/members/" + group.trelloID, function(err, data) {
			if (err) throw err;
		});
		return true;
	}

}

module.exports = Trello;
