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
					console.log(results.body);
				})
			})
		});
	});
}, 30000);
