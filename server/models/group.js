'use strict';

const app = require('../server');

module.exports = function(Group) {
	Group.disableRemoteMethodByName('prototype.__get__members');
	Group.disableRemoteMethodByName('prototype.__create__members');
	Group.disableRemoteMethodByName('prototype.__findById__members');
	Group.disableRemoteMethodByName('prototype.__updateById__members');
	Group.disableRemoteMethodByName('prototype.__delete__members');
	Group.disableRemoteMethodByName('prototype.__destroyById__members');
	Group.disableRemoteMethodByName('prototype.__count__members');
	Group.disableRemoteMethodByName('prototype.__exists__members');
	Group.disableRemoteMethodByName('prototype.__link__members');
	Group.disableRemoteMethodByName('prototype.__unlink__members');

	Group.observe('before save', function(ctx, next) {
		if (ctx.instance && ctx.isNewInstance) {
			ctx.instance.slug = ctx.instance.name.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split(' ')
                .join('-')
                .toLowerCase();
		}
	});

	Group.prototype.addMember = async function(memberId) {
		const member = await this.member.get();

		await app.models.MemberGroups.create({
			memberId: memberId,
			groupId: this.id,
		});

		this.integrationsList.forEach(async integration => {
			const api = await app.integrations.getIntegration(integration.type);
			await api.addMember();
			integration.permissions.forEach(async permission => {
				await api.grant(permission);
			});
		});
	};

	Group.prototype.removeMember = async function(memberId) {
		const member = await this.member.get();

		const entry = await app.models.MemberGroups.find({
			where: {
				memberId: memberId,
				groupId: this.id,
			},
		});
		await entry.destroy({});

		this.integrationsList.forEach(async integration => {
			const api = await app.integrations.getIntegration(integration.type);
			integration.permissions.forEach(async permission => {
				await api.deny(permission);
			});
			await api.removeMember();
		});
	};
};
