#!/usr/bin/env node
'use strict';

var https = require('https')
  , port = process.argv[2] || 443
  , fs = require('fs')
  , path = require('path')
  , checkip = require('check-ip-address')
  , server
  , options
  , certsPath = path.join(__dirname, 'certs', 'server')
  , caCertsPath = path.join(__dirname, 'certs', 'ca')
  ;

options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
, cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))
, requestCert: false
, rejectUnauthorized: false
};

server = https.createServer(options);
checkip.getExternalIp().then(function (ip) {
  var host = ip || 'www.discoro.com'
    ;

  function listen(app) {
    server.on('request', app);
    server.listen(port, function () {
      port = server.address().port;
      console.log('Listening on https://127.0.0.1:' + port);
      console.log('Listening on https://www.discoro.com:' + port);
      if (ip) {
        console.log('Listening on https://' + ip + ':' + port);
      }
    });
  }

  var app = require('./app').create(server, host, port);
  listen(app);
});