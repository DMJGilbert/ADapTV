/*global ADapTV */

ADapTV.factory('Streams', function ($resource) {
	'use strict';

	return $resource('/api/streams', null, {});
});
