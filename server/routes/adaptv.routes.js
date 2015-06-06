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
			var streams = [];

			Channel.find({
				$or: [{
					serviceId: 8261
						}, {
					serviceId: 8384
						}, {
					serviceId: 4172
						}, {
					serviceId: 4287
						}, {
					serviceId: 8500
						}],
				providerId: 3
			}).sort({'providerId': 1}).exec(function (err, data) {
				res.json(data);
			});
		})

	//	// Finish by binding the user middleware
	//	app.param('userId', users.userById);
};
