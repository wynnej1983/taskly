'use strict';

angular.module('todoApp')
  .controller('TasksCtrl', ['$scope', 'taskService',
    function ($scope, taskService) {
      $scope.newTask = '';
      $scope.editedTask = null;
      $scope.itemsCount = 0;
      $scope.itemsPerPage = 3;
      $scope.currentPage = 1;
      $scope.tasks = taskService.getTasks($scope.itemsPerPage, $scope.currentPage - 1);

      $scope.$watch('tasks', function (newValue, oldValue) {
        for (var i = 0, l1 = newValue.length, l2 = oldValue.length; i < l1 && l2; i ++) {
          var taskBefore = oldValue[i];
          var task = newValue[i];
          if (taskBefore && task.done !== taskBefore.done) {
            taskService.saveTask(task);
          }
        }
        $scope.itemsCount = newValue.length ? newValue[0].count : $scope.itemsCount - 1;
      }, true);

      $scope.addTask = function () {
        var task
          , taskName = $scope.newTask.trim();

        if (!taskName.length) { return; }

        task = {
          name: taskName
        , done: false
        };

        $scope.tasks.push(task);
        $scope.newTask = '';
        taskService.saveTask(task, function (i) {
          task._id = i._id;
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

      $scope.onSelectPage = function (page) {
        $scope.tasks = taskService.getTasks($scope.itemsPerPage, page - 1);
      };

      $scope.pagesCount = function () {
        return Math.ceil($scope.itemsCount / $scope.itemsPerPage);
      };
    }
  ]);
