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
			imgur.uploadFile('./app/src/images/stream/' + channel.serviceId + '.jpg').then(function (json) {
				request.get('http://access.alchemyapi.com/calls/url/URLGetRankedImageKeywords?outputMode=json&apikey=8542f9b2e3dec89ec49bb80f1f68a84296fbd883&forceShowAll=1&url=' + json.data.link, function (err, results) {
					if (err) {
						console.log(err);
					}
					var data = JSON.parse(results.body);
					if (data.imageKeywords && data.imageKeywords.length) {
						var current;
						var seconds = new Date().getTime() / 1000;
						for (var i = 0; i < channel.programmes.length; i++) {
							var programme = channel.programmes[i];
							var start = new Date(programme.start);
							var stop = new Date(programme.stop);
							if (start < seconds && stop > seconds) {
								data.imageKeywords.forEach(function (imageKey) {
									var contine = false;
									for (var j = 0; j < channel.programmes[i].categories.length; j++) {
										if (channel.programmes[i].categories.toLowerCase() == imageKey.text.toLowerCase()) {
											channel.programmes[i].categories[j].weighting = channel.programmes[i].categories[j].weighting + 1 / 2;
											contine = true;
										}
									}

									if (!contine) {
										channel.programmes[i].categories.push({
											keyword: key.text,
											weighting: key.score
										});
									}
								});
								break;
							}
						};
					}
				})
			})
		});
	});
}, 30000);
