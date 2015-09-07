
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Client = require('../../models/Client');

router.get('/', function(req, res, next) {
  res.status(200).end();
});

router.post('/', function(req, res, next) {

  var client = req.body.client;

  // search for client
  Client.findOne({ cpf: client.cpf }, function(err, result) {
    if (result) {
      for(var i in client) {
        result[i] = client[i];
      }

      client = result;
    }

    else {
      client = new Client(client);
    }

    client.save(function (err) {
      if (err) throw err;
      res.status(201).end();
    });
  });
});

module.exports = router;
