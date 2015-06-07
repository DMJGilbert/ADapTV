/*global ADapTV, angular, $ */
ADapTV.controller('HomeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'Streams',
	function homeController($scope, $rootScope, $http, $location, $routeParams, Streams) {
		'use strict';

		$scope.reloadData = function () {
			Streams.query({}, function (data) {
				$scope.today = new Date();
				var seconds = $scope.today.getTime() / 1000;

				for (var i = 0; i < data.length; i++) {
					data[i].categories = [];

					for (var j = 0; j < data[i].programmes.length; j++) {

						if (data[i].programmes[j].start <= seconds && seconds <= data[i].programmes[j].stop) {
							data[i].now = data[i].programmes[j];

							if (data[i].programmes[j].category) {
								data[i].categories.push({
									'keyword': data[i].programmes[j].category,
									'weighting': 1
								});
							}

							for (var k = 0; k < data[i].programmes[j].categories.length; k++) {
								data[i].categories.push(data[i].programmes[j].categories[k]);
								data[i].categoriesOccurences = data[i].programmes[j].categoriesOccurences;
							}

							//							for (var k = 0; k < 10; k++) {
							//								data[i].categories.push({
							//									'keyword': 'Test',
							//									'weighting': 0.7
							//								});
							//							}

							if (data[i].programmes[j + 1]) {
								data[i].next = data[i].programmes[j + 1];
							}


							break;
						}
					}
				}

				$scope.channels = data;
			});
		}

		$scope.today = new Date();

		$scope.reloadData();

		$scope.greaterThan = function (prop, val) {
			return function (item) {
				return item[prop] > val;
			}
		}

		setInterval(function () {
			$scope.$apply(function () {
				$scope.reloadData();
			})
		}, 3000);

	}
	]);
