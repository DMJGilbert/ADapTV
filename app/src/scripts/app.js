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
		when('/dashboard', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		}).
		when('/adverts', {
			templateUrl: 'views/adverts.html',
			controller: 'AdvertsController'
		}).
		otherwise({
			redirectTo: '/dashboard'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);
