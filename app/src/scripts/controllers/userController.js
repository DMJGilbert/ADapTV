/*global ADapTV, angular, $ */
ADapTV.controller('UserController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'User',
	function userController($scope, $rootScope, $http, $location, $routeParams, User) {
		'use strict';

		$scope.reloadData = function () {
			User.query({}, function (data) {
				$scope.users = data;
			});
		}

		$scope.today = new Date();

		$scope.reloadData();

		//		setInterval(function () {
		//			$scope.$apply(function () {
		//				$scope.reloadData();
		//			})
		//		}, 3000);

	}
	]);
