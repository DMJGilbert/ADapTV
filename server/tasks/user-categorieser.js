var request = require('request');
var imgur = require('imgur');

var Channels = require('../schemas/channels.schema.js');
var Users = require('../schemas/users.schema.js');

imgur.setClientId('06a55621d55318a');

setInterval(function () {
	Channels.find({
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
		'serviceId': 1
	}).exec(function (err, channels) {
		Users.findOne({}, function (err, user) {
			var channel = channels[user.watching];
			var seconds = new Date().getTime() / 1000;
			for (var i = 0; i < channel.programmes.length; i++) {
				var programme = channel.programmes[i];
				var start = new Date(programme.start);
				var stop = new Date(programme.stop);
				if (start < seconds && stop > seconds) {
					for (var j = 0; j < Math.min(channel.programmes[i].categories.length, 10); j++) {
						var cat = channel.programmes[i].categories[j];
						var cont = false;
						for (var k = 0; k < user.categories.length; k++) {
							if (user.categories[k].keyword.toLowerCase() == cat.keyword.toLowerCase()) {
								user.categories[k].occurences += 1;
								cont = true;
							}
						}

						if (!cont) {
							user.categories.push({
								keyword: cat.keyword,
								occurences: 1
							})
						}
					}
				}
			}

			user.save();
		})
	});
}, 60000);
