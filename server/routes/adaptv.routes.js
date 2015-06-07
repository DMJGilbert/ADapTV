/* jslint node: true */
/* global require, module */
var bodyParser = require('body-parser')
var Channel = require('../schemas/channels.schema.js');
var User = require('../schemas/users.schema.js');
var Advert = require('../schemas/adverts.schema.js');

'use strict';

var jsonParser = bodyParser.json();

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
			}).sort({
				'providerId': 1
			}).exec(function (err, data) {
				res.json(data);
			});
		});

	app.route('/api/users')
		.get(function (req, res) {
			var streams = [];

			User.find().exec(function (err, data) {
				res.json(data);
			});

		})

	app.route('/api/adverts')
		.get(function (req, res) {
			var streams = [];

			Advert.find().exec(function (err, data) {
				res.json(data);
			});
		})

	app.post('/api/adverts', jsonParser, function (req, res) {

			var advert = new Advert(req.body);

			advert.save(function (err, advert) {
				if (err) return console.error(err);
				res.json('Success');
			});
		})
}
