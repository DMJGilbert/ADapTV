var request = require('request');
var imgur = require('imgur');

var Channel = require('../schemas/channels.schema.js');

imgur.setClientId('06a55621d55318a');

setInterval(function () {
	Channel.find({
		stream: {
			$ne: null
		}
	}, function (err, channels) {
		if (err) {
			console.log(err);
		}
		channels.forEach(function (channel) {
			try {
				imgur.uploadFile('./app/src/images/stream/' + channel.serviceId + '.jpg').then(function (json) {
					console.log(json);
					request.get('http://access.alchemyapi.com/calls/url/URLGetRankedImageKeywords?outputMode=json&apikey=8542f9b2e3dec89ec49bb80f1f68a84296fbd883&forceShowAll=1&url=' + json.data.link, function (err, results) {
						if (err) {
							console.log(err);
						}
						var data = JSON.parse(results.body);
						console.log(data);
						if (data.imageKeywords && data.imageKeywords.length) {
							var current;
							var seconds = new Date().getTime() / 1000;
							for (var i = 0; i < channel.programmes.length; i++) {
								var programme = channel.programmes[i];
								var start = new Date(programme.start);
								var stop = new Date(programme.stop);
								if (start < seconds && stop > seconds) {
									data.imageKeywords.forEach(function (imageKey) {
										try {
											var contine = false;
											for (var j = 0; j < channel.programmes[i].categories.length; j++) {
												if (channel.programmes[i].categories[j].keyword.toLowerCase() == imageKey.text.toLowerCase()) {
													channel.programmes[i].categories[j].occurences = (channel.programmes[i].categories[j].occurences || 0) + 1
													contine = true;
												}
											}

											if (!contine) {
												console.log(imageKey);
												channel.programmes[i].categories.push({
													keyword: imageKey.text,
													occurences: 1
												});
											}
										} catch (e) {
											console.log(e);
										}
									});
									channel.programmes[i].categoriesOccurences = (channel.programmes[i].categoriesOccurences || 0) + data.imageKeywords.length;
									channel.save();
									break;
								}
							};
						}
					})
				}).catch(function (err) {
					console.log(err.message);
				});
			} catch (e) {
				console.log(e)
			}
		});
	});
}, 60000);
