'use strict';

angular.module('todoApp')
  .controller('TaskCtrl', ['$scope', 'taskService',
    function ($scope, taskService) {
      $scope.newTask = '';
      $scope.editedTask = null;
      $scope.tasks = taskService.getTasks();

      $scope.$watch('tasks', function (newValue, oldValue) {
        for (var i = 0, l1 = newValue.length, l2 = oldValue.length; i < l1 && l2; i ++) {
          var taskBefore = oldValue[i];
          var task = newValue[i];
          if (taskBefore && task.done !== taskBefore.done) {
            taskService.saveTask(task);
          }
        }
      }, true);

      $scope.addTask = function () {
        var task
          , taskName = $scope.newTask.trim();

        if (!taskName.length) { return; }

        task = {
          id: null
        , name: taskName
        , done: false
        };

        $scope.tasks.push(task);
        $scope.newTask = '';
        taskService.saveTask(task, function (i) {
          task.id = i.id;
        });
      };

      $scope.editTask = function (task) {
        $scope.editedTask = task;
      };

      $scope.endEdit = function (task) {
        $scope.editedTask = null;
        task.name = task.name.trim();

        if (!task.name) {
          $scope.removeTask(task);
        } else {
          taskService.saveTask(task);
        }
      };

      $scope.removeTask = function (task) {
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        taskService.deleteTask(task);
      };
    }
  ]);
