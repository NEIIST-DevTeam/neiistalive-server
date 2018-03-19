'use strict';

const groupSlugRegex = /\/groups\/([a-zA-Z0-9-_.]*)/;

module.exports = function() {

    return function myMiddleware(req, res, next) {
        let matches;
        if(matches = req.url.match(groupSlugRegex)){
            switch(matches[1]){
                case 'example':
                    req.url = req.url.replace('/groups/example', '/groups');
                    break;
            }
        }
        next();
    }
};
  