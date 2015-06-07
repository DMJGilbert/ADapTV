/*global ADapTV */

ADapTV.factory('User', function ($resource) {
	'use strict';

	return $resource('/api/user', null, {});
});
