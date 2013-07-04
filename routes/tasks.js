/*global exports: true, console: true*/

var _ = require('lodash')
  , Js2Xml = require("js2xml").Js2Xml
  , setContentTypeFromResourceExtname = require('../middleware/setContentTypeFromResourceExtname')
  , Task = require('../models/task');

exports.mapRoutes = function (app) {

  app.get('/api/v1/tasks/getLastAction:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
      if (res.format === 'xml') {
        var lastActionXml = new Js2Xml('lastAction', req.session.lastAction).toString();
        res.send(lastActionXml);
      } else {
        res.send(req.session.lastAction);
      }
  });

  app.get('/api/v1/tasks:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
    Task.find(function (err, tasks) {
      if (err) {
        console.log(err);
        return res.send(404, { error: 'could not load tasks' });
      }
      if (res.format === 'xml') {
        var tasksXml = new Js2Xml('tasks', tasks.map(function (i) {return {_id: i._id.toString(), user_id: i.user_id, name: i.name, done: i.done, __v: i.__v}; })).toString();
        res.send(tasksXml);
      } else {
        res.send(tasks);
      }
    });
  });

  app.get('/api/v1/tasks/:id:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
    var id = req.params.id;
    Task.findById(id, function (err, task) {
      if (err) {
        console.log(err);
        return res.send(404, { error: 'could not find task with id ' + id });
      }
      task = task.toObject();
      task.lastAction = req.session.lastAction;
      console.log(task);
      if (res.format === 'xml') {
        var taskXml = new Js2Xml('task', task).toString();
        res.send(taskXml);
      } else {
        res.send(task);
      }
    });
  });

  app.post('/api/v1/tasks:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
    Task.create({
      user_id: 1
    , name: req.body.name
    , done: req.body.done
    }, function (err, task) {
      if (err) {
        console.log(err);
        return res.send(400, { error: 'could not create task due to bad request' });
      }
      task = task.toObject();
      req.session.lastAction = {'POST': {_id: task._id, user_id: task.user_id, name: task.name, done: task.done}};
      task.lastAction = req.session.lastAction;
      if (res.format === 'xml') {
        var taskXml = new Js2Xml('task', task).toString();
        res.send(taskXml);
      } else {
        res.location('/api/v1/tasks/' + task._id)
           .send(201, task);
      }
    });
  });

  app.put('/api/v1/tasks/:id:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
    var id = req.params.id;
    Task.findByIdAndUpdate(id, { name: req.body.name, done: req.body.done }, function (err, task) {
      if (err) {
        console.log(err);
        return res.send(400, { error: 'could not update task due to bad request' });
      }
      task = task.toObject();
      req.session.lastAction = {'PUT': {_id: task._id, user_id: task.user_id, name: task.name, done: task.done}};
      task.lastAction = req.session.lastAction;
      if (res.format === 'xml') {
        var taskXml = new Js2Xml('task', task).toString();
        res.send(taskXml);
      } else {
        res.send(task);
      }
    });
  });

  app.del('/api/v1/tasks/:id:format(.json|.xml)?', setContentTypeFromResourceExtname, function (req, res) {
    var id = req.params.id;
    Task.findByIdAndRemove(id, function (err, task) {
      if (err) {
        console.log(err);
        return res.send(400, { error: 'could not delete task with id ' + id + ' due to bad request' });
      }
      task = task.toObject();
      req.session.lastAction = {'DELETE': task};
      if (res.format === 'xml') {
        var taskXml = new Js2Xml('task', {_id: task._id, user_id: task.user_id, name: task.name, done: task.done}).toString();
        res.send(taskXml);
      } else {
        res.send(204, { success: 'task was deleted' });
      }
    });
  });

};
