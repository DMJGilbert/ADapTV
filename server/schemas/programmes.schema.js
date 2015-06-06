var mongoose = require('mongoose');

var programmesSchema = mongoose.Schema({
    title: String,
	serviceId: Number,
	providerId: Number,
	start: Number,
	stop: Number,
	desc: String,
	category: String
})

module.exports = mongoose.model('Programme', programmesSchema);