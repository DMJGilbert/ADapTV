/*global ADapTV */

ADapTV.factory('Advert', function ($resource) {
	'use strict';

	return $resource('/api/adverts', null, {});
});
