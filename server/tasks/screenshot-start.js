var sys = require('sys')
var spawn = require('child_process').spawn;
var Channel = require('../schemas/channels.schema.js');

Channel.find({
	stream: {
		$ne: null
	}
}, function (err, channels) {
	if (err) {
		console.log(err);
	}
	channels.forEach(function (channel) {
		var stream = channel.stream;
		var name = channel.serviceId;
		var child = spawn('ffmpeg', ['-i', stream, '-r', '1', '-an', '-updatefirst', '1', '-y', 'app/src/images/stream/' + name + '.jpg', '-v', '0']);
	})
});
