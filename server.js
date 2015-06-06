var express = require("express");
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var request = require('request');

var port = process.env.PORT || 3700;

app.use(require('prerender-node'));

require('./server/routes/adaptv.routes.js')(app);

// define the root directory for the client files
app.use(express.static('app/src'));

// define the directory for the lib folder
app.use('/lib', express.static('app/lib'));

mongoose.connect('mongodb://localhost/adaptv');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var Channel = require('./server/schemas/channels.schema.js');

Channel.find({
	providerId: 3,
	programmes: null
}, 'serviceId providerId').lean().limit(50).exec(function (err, data) {
	request(, function (error, response, body) {		
		console.log(response);
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);

			var programmes = [];
			for (var i = 0; i < body.programmes.length; i++) {
				if (!programmes[body.programmes[i].serviceId]) {
					programmes[body.programmes[i].serviceId] = [];
				}

				programmes[body.programmes[i].serviceId].push({
					title: body.programmes[i].title,
					serviceId: body.programmes[i].serviceId,
					providerId: body.programmes[i].providerId,
					start: body.programmes[i].start,
					stop: body.programmes[i].stop,
					desc: body.programmes[i].desc,
					category: body.programmes[i].category
				});
			}
			
			for (var i = 0; i < data.length; i++) {
				Channel.findOne({
					serviceId: data[i].serviceId
				}).exec(function (err, channel) {
					channel.programmes = programmes[channel.serviceId] || [];
					channel.save(function (error, data) {
						if (error) {
							console.log(error);
						}
					});
				});
			}
		}
	})
});

// for when not using socket.io
server.listen(port);

// when using socket.io
// var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);