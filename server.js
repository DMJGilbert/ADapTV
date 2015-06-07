var express = require("express");
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var request = require('request');

var Channels = require('./server/schemas/channels.schema.js');
var Users = require('./server/schemas/users.schema.js');
var Adverts = require('./server/schemas/adverts.schema.js');

require('./server/tasks.js');

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

io.on('connection', function (socket) {
	socket.on('channels', function (data) {
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
		}).exec(function (err, data) {
			socket.emit('channels', data);
		});
	});

	socket.on('viewing', function (data) {
		Users.findOne({}, function (err, user) {
			user.watching = data.index;
			user.actions.push({
				action: 'Changed channel to ' + data.name
			});
			user.save();
		})
	});

	socket.on('disconnect', function (data) {
		//Set as not viewing channels
		Users.findOne({}, function (err, user) {
			user.watching = -1;
			user.save();
		})
	})
});

app.route('/api/forcead').get(function (req, res) {
	Users.findOne({}, function (err, user) {
		Adverts.find({}, function (err, ads) {
			var send = [];
			ads.forEach(function (ad) {
				var tempScore = 0;
				user.categories.forEach(function (cat) {
					ad.categories.forEach(function (adCat) {
						if (cat.keyword.toLowerCase() == adCat.keyword.toLowerCase()) {
							tempScore += cat.keyword.occurences;
						}
					})
				});
				if (tempScore > 0) {
					send.push({
						score: tempScore,
						ad: ad
					});
				}
			});
			try {
				var derp = Math.min(Math.round(Math.random() * send.length), 0);
				console.log(derp);
				var selectedAd = send[derp];
				io.emit('advert', {
					stream: 'http://mp4://192.168.137.1:3700/adverts/' + selectedAd.ad._id + '.mp4',
					time: 6000
				});
			} catch (e) {
				console.log(e);
			}
		})
	})
});

app.all('/*', function (req, res, next) {
	res.sendFile('index.html', {
		root: './app/src'
	});
});

// for when not using socket.io
server.listen(port);

// when using socket.io
// var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);
