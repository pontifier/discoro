'use strict';
var express = require('express');
var serveStatic = require('serve-static');
module.exports.create = function (server, host, port) {
    var app=express();
    app.use(serveStatic('./public'));

  // normall you'd return express or connect here
  return function (req, res) {
    res.end(
      "\n\nMy name is Marvin, not that you would care."
    + "\n\nYou've reached " + host + " on port " + port + ". Meh... Congratulations, I guess."
    );
  };
};
