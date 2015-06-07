/*global ADapTV */

ADapTV.factory('User', function ($resource) {
	'use strict';

	return $resource('/api/users', null, {});
});
