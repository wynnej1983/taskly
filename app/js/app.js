'use strict';

angular
  .module('taskly', ['ui.bootstrap', 'services', 'directives', 'filters'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

		$routeProvider
      .when('/tasks',
            { controller: 'TasksCtrl'
            , templateUrl: 'partials/tasks.html' })
      .otherwise({ redirectTo: '/tasks'});
	}]);
