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
		category: String,
		epgChecked: Boolean,
		categories: [{
			keyword: String,
			occurences: Number
		}],
		categoriesOccurences: Number
	}]
})

module.exports = mongoose.model('Channel', channelsSchema);
