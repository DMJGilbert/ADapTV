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
var Programme = require('./server/schemas/programmes.schema.js');


//request('http://epg.techex.co.uk/index.php?username=' + process.env.USERNAME + '&password=' + process.env.PASSWORD, function (error, response, body) {
//	if (!error && response.statusCode == 200) {
//		body = JSON.parse(body);
//		
//		for (var i = 0; i < body.channels.length; i++) {
//			var channel = new Channel({
//				name: body.channels[i]['display-name'],
//				providerId: body.channels[i].providerId,
//				serviceId: body.channels[i].serviceId,
//			});
//
//			channel.save(function (err, channel) {
//				if (err) return console.error(err);
//			});
//		}
//	}
//})

//Channel.find({
//	providerId: 3
//}).limit(20).exec(function (err, data) {
//	request('http://epg.techex.co.uk/index.php?username=' + process.env.USERNAME + '&password=' + process.env.PASSWORD, function (error, response, body) {
//		if (!error && response.statusCode == 200) {
//			body = JSON.parse(body);
//			for (var i = 0; i < body.programmes.length; i++) {
//				var programme = new Programme({
//					title: body.programmes[i].title,
//					serviceId: body.programmes[i].serviceId,
//					providerId: body.programmes[i].providerId,
//					start: body.programmes[i].start,
//					stop: body.programmes[i].stop,
//					desc: body.programmes[i].desc,
//					category: body.programmes[i].category
//				});
//
//				programme.save(function (err, programme) {
//					if (err) return console.error(err);
//				});
//			}
//		}
//	})
//});


// for when not using socket.io
server.listen(port);

// when using socket.io
// var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);