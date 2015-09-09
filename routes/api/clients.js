
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Client = require('../../models/Client');
var ClientsEngine = require('../../public/javascripts/climan/services/ClientsEngineService');

router.get('/:cpf?', function(req, res, next) {
  var cpf = req.params.cpf;

  if (!ClientsEngine.validateCPF(cpf)) {
    res.status(404).end();
  }

  Client.findOne({ cpf: cpf }, function(err, result) {
    if (err) throw err;

    if (result) {
      res.json(result);
    }
    else {
      res.status(404).end();
    }
  });
});

router.delete('/:cpf', function(req, res, next) {
  var cpf = req.params.cpf;

  if (!ClientsEngine.validateCPF(cpf)) {
    res.status(404).end();
  }

  var chain = [

    function() {
      Client.findOne({ cpf: cpf }, chain.shift());
    },

    function(err, result) {
      if (err) throw err;
      if (result === null) {
        res.status(404).end();
      }

      chain.shift()();
    },

    function() {
      Client.remove({ cpf: cpf }, chain.shift());
    },

    function(err, result) {
      if (err) throw err;
      res.status(204).end();
    }

  ];

  chain.shift()();
});

router.post('/', function(req, res, next) {
  var client = req.body.client;

  var i = 0;

  if (!ClientsEngine.validateCPF(client.cpf)) {
    res.status(400).end();
  }

  var chain = [
    function() {
      Client.findOne({ cpf: client.cpf }, chain.shift());
    },

    function(err, result) {
      if (result) {
        for(var i in client) {
          result[i] = client[i];
        }
        client = result;
        client.save(function (err) {
            if (err) throw err;
            res.status(200).end();
        });
      }

      else {
        chain.shift()();
      }
    },

    function() {
      client = new Client(client);
      client.save(function (err) {
        console.log(err);
        if (err) throw err;
        res.status(201).end();
      });
    }

  ];

  chain.shift()();
});

module.exports = router;
