/*global module: true*/
var _ = require('lodash');

module.exports = {
  mapRoutes: function (app) {
    var tasks = [
      {id: 1, 'name': 'do that', done: false},
      {id: 2, 'name': 'then do that', done: false},
      {id: 3, 'name': 'and then do that', done: false}
    ];

    app.get('/api/v1/tasks', function (req, res) {
      res.send(tasks);
    });

    app.get('/api/v1/tasks/:id', function (req, res) {
      var taskId = parseInt(req.params.id, 10)
        , task = _.find(tasks, {id: taskId});

      if (!task) {
        return res.send(404, {error: 'could not find task id ' + taskId});
      } else {
        return res.send(task);
      }
    });

    app.post('/api/v1/tasks', function (req, res) {
      var newId = (tasks && tasks.length > 0) 
        ? _.max(tasks, 'id').id + 1 
        : 1;

      var task = {
        id: newId
      , name: req.body.name
      , done: req.body.done
      };

      tasks.push(task);

      return res.send(task);
    });

    app.put('/api/v1/tasks/:id', function (req, res) {
      var task = _.find(tasks, {'id': parseInt(req.params.id, 10)});

      task.name = req.body.name;
      task.done = req.body.done;

      return res.send(task);
    });

    app.delete('/api/v1/tasks/:id', function (req, res) {
      var task = _.find(tasks, {'id': parseInt(req.params.id, 10)});

      tasks.splice(tasks.indexOf(task), 1);

      return res.send({});
    });

  }
};
