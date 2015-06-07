var mongoose = require('mongoose');

var advertsSchema = mongoose.Schema({
	name: String,
	stream: String,
	categories: [{
		keyword: String,
		count: Number
		}],
	categoryCount: Number,
	views: Number
})

module.exports = mongoose.model('Advert', advertsSchema);
