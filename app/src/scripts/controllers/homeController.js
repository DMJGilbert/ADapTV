/*global ADapTV, angular, $ */
ADapTV.controller('HomeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'Streams',
	function homeController($scope, $rootScope, $http, $location, $routeParams, Streams) {
		'use strict';

		$scope.reloadData = function () {
			Streams.query({}, function (data) {
				$scope.today = new Date();
				var seconds = $scope.today.getTime() / 1000;

				for (var i = 0; i < data.length; i++) {
					if (!data[i].categories) {
						data[i].categories = [];
					}

					for (var j = 0; j < data[i].programmes.length; j++) {

						if (data[i].programmes[j].start <= seconds && seconds <= data[i].programmes[j].stop) {
							data[i].now = data[i].programmes[j];

							if (data[i].programmes[j].category) {
								data[i].categories.push(data[i].programmes[j].category);
							}

							if (data[i].programmes[j + 1]) {
								data[i].next = data[i].programmes[j + 1];
							}

							break;
						}
					}
				}

				$scope.channels = data;

				console.log($scope.channels);
			});
		}

		$scope.today = new Date();

		setInterval(function () {
			$scope.$apply(function () {
				$scope.reloadData();
			})
		}, 3000);

	}
	]);
