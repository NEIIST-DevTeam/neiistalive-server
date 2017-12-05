'use strict';

class Integration {
	constructor() {
		if (new.target === Integration) {
			throw new TypeError('Integration is an abstract class');
		}
	}

	init() {
		throw new TypeError('init was not implemented');
	}

	addUser(users) {
		throw new TypeError('addUser was not implemented');
	}

	removeUser(users) {
		throw new TypeError('removeUser was not implemented');
	}

	grant(users, perm) {
		throw new TypeError('grant was not implemented');
	}

	deny(users, perm) {
		throw new TypeError('deny was not implemented');
	}
}

module.exports = Integration;
