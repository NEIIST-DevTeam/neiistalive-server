'use strict';

const groupSlugRegex = /\/groups\/([a-zA-Z0-9-_.]*)/;

module.exports = function() {
	return function myMiddleware(req, res, next) {
		const matches = req.url.match(groupSlugRegex);
		if (matches.length) {
			switch (matches[1]) {
				case 'example':
					req.url = req.url.replace('/groups/example', '/groups');
					break;
			}
		}
		next();
	};
};
