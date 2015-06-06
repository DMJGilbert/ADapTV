/* jslint node: true */
/* global require, module */
var Channel = require('../schemas/channels.schema.js');

'use strict';

module.exports = function (app) {

	//	app.route('/api/users')
	//		.get(users.list)
	//		.post(users.create);
	app.route('/api/streams')
		.get(function (req, res) {
//			var streams = [];
//
//			Channel.find({
//				providerId: 3
//			}).exec(function (err, data) {
//				for (var i = 0; data.length; i++) {
//					Programme.find({
//						serviceId: data[i].serviceId
//					}).exec(function (err, data) {
//						streams.push({
//							'name': data[i].name,
//							'programmes': data
//						})
//					});
//				}
//			});

			res.json({
				'name': 'Max John Maybury'
			});
		})


	//	// Finish by binding the user middleware
	//	app.param('userId', users.userById);
};