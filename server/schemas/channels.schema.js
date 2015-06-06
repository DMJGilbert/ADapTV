var mongoose = require('mongoose');

var channelsSchema = mongoose.Schema({
    name: String,
	serviceId: Number,
	providerId: Number
})

module.exports = mongoose.model('Channel', channelsSchema);