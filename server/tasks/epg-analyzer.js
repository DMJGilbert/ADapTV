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
				request.get('http://access.alchemyapi.com/calls/text/TextGetRankedKeywords?outputMode=json&apikey=8542f9b2e3dec89ec49bb80f1f68a84296fbd883&text=' + current.desc, function (err, results) {
					if (err) {
						console.log(err);
					}
					var cats = [];
					var data = JSON.parse(results.body);
					data.keywords.forEach(function (key) {
						cats.push({
							keyword: key.text,
							count: 1
						})
					})
					channel.programmes[i].categories = cats;
					channel.programmes[i].epgChecked = true;
					channel.programmes[i].categoriesCount = cats.length;
					channel.save();
				});
			}
		});
	});
}, 60000);
