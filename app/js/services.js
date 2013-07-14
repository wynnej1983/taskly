'use strict';

angular
  .module('services', ['ngResource'])
	.factory('taskService', function ($resource) {
		var Task = $resource(
      '/api/v1/tasks/:id'
    , {id: '@_id'}
    , { 'update': { method: 'PUT' } });

    return {
      getTasks: function (limit, offset) {
        return Task.query({limit: limit, offset: offset});
      },
      saveTask: function (task, cb) {
        var update = !!task._id;
        task = new Task(task);

        return update ?
         task.$update() :
         task.$save(function (i) {
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
