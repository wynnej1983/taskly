'use strict';

angular.module('directives', [])
	.directive('ltNavBar', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'directive-templates/navBar.html'
		};
	});
