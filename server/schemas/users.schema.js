var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	name: String,
	watching: String,
	categories: [{
		keyword: String,
		rating: Number
	}]
})

module.exports = mongoose.model('User', usersSchema);
