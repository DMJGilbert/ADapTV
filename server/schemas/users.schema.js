var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	name: String,

	mac: String,
	watching: Number,
	categories: [{
		keyword: String,
		occurences: Number
	}],
	categoriesOccurences: Number,
	actions: [{
		action: String,
		dateTime: Date
	}]
});

module.exports = mongoose.model('User', usersSchema);
