'use strict';

angular
  .module('services', ['firebase'])
	.factory('taskService', function (angularFireCollection) {
    var url = 'https://taskly.firebaseio.com/tasks';
    var ref = new Firebase(url);
    var tasks = null;

    return {
      getTasks: function (limit, offset) {
        tasks = angularFireCollection(ref.limit(limit));
        return tasks;
      },
      saveTask: function (task, cb) {
        //if (tasks.indexOf(task) > -1) {
          //tasks.update(task);
        //} else {
          tasks.add(task);
        //}
        cb(task);
      },
      deleteTask: function (task) {
        tasks.remove(task);
      }
    };
	});
