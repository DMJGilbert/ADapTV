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
			var seconds = new Date().getTime() / 1000;
			for (var i = 0; i < channel.programmes.length; i++) {
				var programme = channel.programmes[i];
				var start = new Date(programme.start);
				var stop = new Date(programme.stop);
				if (start < seconds && stop > seconds) {
					current = programme;
					break;
				}
			};
			if (current && !current.epgChecked) {
				request.get('http://access.alchemyapi.com/calls/text/TextGetRankedKeywords?outputMode=json&apikey=0c2fa8eb5bec107889f229f7ec5f0d3803c65122&text=' + current.desc, function (err, results) {
					if (err) {
						console.log(err);
					}
					var cats = [];
					var data = JSON.parse(results.body);
					data.keywords.forEach(function (key) {
						cats.push({
							keyword: key.text,
							occurences: 1
						})
					})
					channel.programmes[i].categories = cats;
					channel.programmes[i].epgChecked = true;
					channel.programmes[i].categoriesOccurences = cats.length;
					channel.save();
				});
			}
		});
	});
}, 60000);
