/*global ADapTV, angular, $ */
ADapTV.controller('AdvertController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'Advert',
	function advertController($scope, $rootScope, $http, $location, $routeParams, Advert) {
		'use strict';

		$scope.newAdvert = {};

		Advert.query({}, function (data) {
			console.log(data);
			$scope.adverts = data;
		});

		$scope.saveAdvert = function () {
			Advert.save($scope.newAdvert,
				function (data) {
					$scope.adverts.push($scope.newAdvert);
					$scope.newAdvert = {};
				});
		}
	}
	]);
