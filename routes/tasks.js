/*global module: true, console: true*/

var _ = require('lodash')
  , Task = require('../models/task');

module.exports = {
  mapRoutes: function (app) {
    app.get('/api/v1/tasks', function (req, res) {
      if (req.fresh) { console.log('conditional GET use cached copy of resource'); return res.send(304); }

      Task.find(function (err, tasks) {
        if (err) {
          console.log(err);
          return res.send(404, { error: 'could not load tasks' });
        }
        res.send(tasks);
      });
    });

    app.get('/api/v1/tasks/:id', function (req, res) {
      var id = req.params.id;
      Task.findById(id, function (err, task) {
        if (err) {
          console.log(err);
          return res.send(404, { error: 'could not find task with id ' + id });
        }
        res.send(task);
      });
    });

    app.post('/api/v1/tasks', function (req, res) {
      Task.create({
        user_id: 1
      , name: req.body.name
      , done: req.body.done
      }, function (err, task) {
        if (err) {
          console.log(err);
          return res.send(400, { error: 'could not create task due to bad request' });
        }
        res.location('/api/v1/tasks/' + task._id)
           .send(201, task);
      });
    });

    app.put('/api/v1/tasks/:id', function (req, res) {
      var id = req.params.id;
      Task.findByIdAndUpdate(id, { name: req.body.name, done: req.body.done }, function (err, task) {
        if (err) {
          console.log(err);
          return res.send(400, { error: 'could not update task due to bad request' });
        }
        res.send(task);
      });
    });

    app.delete('/api/v1/tasks/:id', function (req, res) {
      var id = req.params.id;
      Task.findByIdAndRemove(id, function (err) {
        if (err) {
          console.log(err);
          return res.send(400, { error: 'could not delete task with id ' + id + ' due to bad request' });
        }
        res.send(204, { success: 'task was deleted' });
      });
    });

  }
};
