'use strict';

module.exports = function(Member) {
	Member.disableRemoteMethodByName('prototype.__*__groups');
	Member.disableRemoteMethodByName('prototype.__get__groups');
	Member.disableRemoteMethodByName('prototype.__create__groups');
	Member.disableRemoteMethodByName('prototype.__findById__groups');
	Member.disableRemoteMethodByName('prototype.__updateById__groups');
	Member.disableRemoteMethodByName('prototype.__delete__groups');
	Member.disableRemoteMethodByName('prototype.__destroyById__groups');
	Member.disableRemoteMethodByName('prototype.__count__groups');
	Member.disableRemoteMethodByName('prototype.__exists__groups');
	Member.disableRemoteMethodByName('prototype.__link__groups');
	Member.disableRemoteMethodByName('prototype.__unlink__groups');
};
