'use strict';

const app = require('../server');
const querystring = require('querystring');
const request = require('request-promise-native');

module.exports = function(Member) {
	//Member.disableRemoteMethodByName('login');
	Member.disableRemoteMethodByName('logout');
	Member.disableRemoteMethodByName('resetPassword');
	Member.disableRemoteMethodByName('changePassword');
	Member.disableRemoteMethodByName('setPassword');

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

	Member.login = async function(res){
		const base = app.config('fenixedu.fenix_url');
		const client = querystring.escape(app.config('fenixedu.client_id'));
		const redirect = querystring.escape(app.config('fenixedu.redirect_url'));

		res.redirect(301, `${base}userdialog?client_id=${client}&redirect_uri=${redirect}`);
	}

	Member.fenixLogin = async function(code, res){
		const base = app.config('fenixedu.fenix_url');
		const api = app.config('fenixedu.api_url');
		const client = querystring.escape(app.config('fenixedu.client_id'));
		const secret = querystring.escape(app.config('fenixedu.client_secret'));
		const redirect = querystring.escape(app.config('fenixedu.redirect_url'));

		const auth = await request.post({
			url: `${base}access_token?client_id=${client}&client_secret=${secret}&redirect_uri=${redirect}&code=${code}&grant_type=authorization_code`,
			json: true 
		});
		const data = await request.get({
			url: `${api}person?access_token=${auth.access_token}`,
			json: true
		});
		let member;

		if(member = await Member.findById(data.username)){
			
		}
		else {
			member = await Member.create({
				username: data.username,
				name: data.name,
				displayName: data.displayName,
				photo: {
					type: data.photo.type,
					data: data.photo.data
				},
				email: data.email,
				password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
			});
		}
		const token = await member.createAccessToken({});
		res.cookie('X-Access-Token', token.id, { maxAge: token.ttl });
		return token;
	}

	Member.remoteMethod('login', {
		accepts: [
			{arg: 'res', type: 'object', http: ctx => { return ctx.res; }}
		],
		http: { verb: 'get', path: '/login' }
	});

	Member.remoteMethod('fenixLogin', {
		accepts: [
			{arg: 'code', type: 'string'},
			{arg: 'res', type: 'object', http: ctx => { return ctx.res; }}
		],
		returns: {'arg': 'data', 'type': 'AccessToken', 'root': true},
		http: { verb: 'get', path: '/login-fenixedu' }
	});
};
