var mongoose = require('mongoose');

var channelsSchema = mongoose.Schema({
	name: String,
	serviceId: Number,
	providerId: Number,
	stream: String,
	programmes: [{
		title: String,
		serviceId: Number,
		providerId: Number,
		start: Number,
		stop: Number,
		desc: String,
		category: String
	}]
})

module.exports = mongoose.model('Channel', channelsSchema);
