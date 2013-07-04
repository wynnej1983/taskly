/*global module: true*/

'use strict';

module.exports = function (req, res, next) {
  var format = req.accepts('json, xml');
  if (req.params.format) {
    format = req.params.format.substring(1);
  }
  res.type(format);
  res.format = format;

  next();
};
