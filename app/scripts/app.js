'use strict';

angular
  .module('todoApp', ['ui.bootstrap', 'services', 'directives', 'filters'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

		$routeProvider
      .when('/tasks',
            { controller: 'TasksCtrl'
            , templateUrl: 'views/tasks.html' })
      .otherwise({ redirectTo: '/tasks'});
	}]);
