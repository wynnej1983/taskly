'use strict';

angular
  .module('services', ['ngResource'])
	.factory('taskService', function ($resource) {
		var Task = $resource(
      '/api/v1/tasks/:id'
    , {id: '@id'}
    , { 'update': { method: 'PUT' } });

    return {
      getTasks: function () {
        return Task.query();
      },
      saveTask: function (task, cb) {
        var update = task.id > 0;
        task = new Task(task);

        return update
          ? task.$update()
          : task.$save(function (i) {
              if (cb) {
                cb(i);
              }
            });
      },
      deleteTask: function (task) {
        task = new Task(task);

        return task.$delete();
      }
    };
	});
