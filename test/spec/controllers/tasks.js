/*global module: true, describe: true, it: true, expect: true, beforeEach: true, inject: true, spyOn: true*/

describe('Controller: TasksCtrl', function () {

  // load the controller's module
  beforeEach(module('taskly'));

  var tasksCtrl
    , scope
    , mockTaskService = {
        getTasks: function () {}
      , saveTask: function () {}
      , deleteTask: function () {}
    };

  describe('initially loaded', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      spyOn(mockTaskService, 'saveTask');
      spyOn(mockTaskService, 'getTasks').andReturn([{}, {}, {}]);
      tasksCtrl = $controller('TasksCtrl', { $scope: scope, taskService: mockTaskService });
    }));

    it('should return list of tasks', function () {
      expect(scope.tasks.length).toBe(3);
    });

    it('should call taskService#getTasks()', function () {
      expect(mockTaskService.getTasks).toHaveBeenCalled();
    });

    it('should not call taskService#saveTask()', function () {
      expect(mockTaskService.saveTask).wasNotCalled();
    });

  });
});
