/*global ADapTV */

ADapTV.config(['$resourceProvider', function ($resourceProvider) {
	'use strict';

	// Don't strip trailing slashes from calculated URLs
	$resourceProvider.defaults.stripTrailingSlashes = false;
}]);
