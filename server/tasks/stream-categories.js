var request = require('request');
var fs = require('fs');
fs.readFile('../ITV.jpg', 'utf8', function (err, data) {
	request.post({
		url: "http://access.alchemyapi.com/calls/image/ImageGetRankedImageKeywords?outputMode=json&apikey=",
		form: 'image=' + data
	}, function (error, response, body) {
		if (error) {
			console.log(error);
		}
		console.log(body);
	});
});
