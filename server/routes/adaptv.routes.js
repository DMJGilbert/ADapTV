/* jslint node: true */
/* global require, module */
'use strict';

module.exports = function (app) {

//	app.route('/api/users')
//		.get(users.list)
//		.post(users.create);
	app.route('/api/name')
		.get( function (req, res){
			res.json({'name' : 'Max John Maybury'});
		})


//	// Finish by binding the user middleware
//	app.param('userId', users.userById);
};
