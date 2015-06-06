var request = require('request');

var Channel = require('../schemas/channels.schema.js');

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
			var current;
			for (var i = 0; i < channel.programmes.length; i++) {
				var programme = channel.programmes[i];
				var start = new Date(programme.start);
				var stop = new Date(programme.stop);
				if (start > new Date() && stop < new Date()) {
					current = programme;
					break;
				}
			};
			console.log(channel.name);
			if (current) {
				request.get('http://access.alchemyapi.com/calls/text/TextGetRankedKeywords?outputMode=json&apikey=8542f9b2e3dec89ec49bb80f1f68a84296fbd883&text=' + current.desc, function (err, results) {
					if (err) {
						console.log(err);
					}
					console.log(results.body);
				})
			}
		});
	});
}, 1000);
