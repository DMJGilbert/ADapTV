/*global ADapTV, angular, $ */
ADapTV.controller('UserController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'User',
	function userController($scope, $rootScope, $http, $location, $routeParams, User) {
		'use strict';

		$scope.reloadData = function () {
			User.query({}, function (data) {

				for (var i = 0; i < data[i].programmes[j].categories.length; i++) {
					data[0].categories[i] = data[0].categories[i].toUpperCase();
				}

				$scope.user = data[0];
			});
		}

		$scope.today = new Date();

		$scope.reloadData();

		setInterval(function () {
			$scope.$apply(function () {
				$scope.reloadData();
			})
		}, 3000);

		$scope.greaterThan = function (prop, val) {
			return function (item) {
				return item[prop] > val;
			}
		}

	}
	]);
