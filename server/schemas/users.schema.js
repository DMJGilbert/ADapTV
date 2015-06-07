var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	name: String,
	mac: String,
	watching: String,
	categories: [{
		keyword: String,
		count: Number
	}],
	actions : [{
		action: String,
		dateTime: Date
	}]
})

module.exports = mongoose.model('User', usersSchema);
