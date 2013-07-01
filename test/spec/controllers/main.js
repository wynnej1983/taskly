'use strict';

describe('Controller: TasksCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var tasksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    tasksCtrl = $controller('tasksCtrl', {
      $scope: scope
    });
  }));

  it('should return list of tasks', function () {
    expect(scope.tasks.length).toBe(3);
  });
});
