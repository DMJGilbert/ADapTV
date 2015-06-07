var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	name: String,
	watching: Number,
	categories: [{
		keyword: String,
		rating: Number
	}],
	categoriesCount: Number
})

module.exports = mongoose.model('User', usersSchema);
