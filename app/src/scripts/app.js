'use strict';
/**
 * The main ADapTV app module
 *
 * @type {angular.Module}
 */

// create the app, and take any angular modules as parameters
var ADapTV = angular.module('ADapTVApp', ['ngRoute', 'LocalStorageModule', 'ngResource']);

ADapTV.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		}).
		otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);
