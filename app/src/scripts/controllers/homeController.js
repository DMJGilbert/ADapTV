/*global ADapTV, angular, $ */
ADapTV.controller('HomeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'Streams',
	function homeController($scope, $rootScope, $http, $location, $routeParams, Streams) {
		'use strict';

		Streams.get({}, function (data) {
			console.log(data);
		});

	}
	]);