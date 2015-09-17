var test         = require('tape');
var clientEngine = require('../public/javascripts/climan/services/ClientsEngineService');

test('#1 - Testing a function that validates a CPF number...', function (t) {
  // number of assertions
  t.plan(8);

  // set timeout in ms for performance coverage
  t.timeoutAfter(50);

  var invalidBadFormat          = 'OhThisIsStr';
  var invalidDecimal            = 514.48845651;
  var invalidNaN                = Number.NaN;
  var invalidPositiveInfinity   = Number.POSITIVE_INFINITY;
  var invalidNegativeInfinity   = Number.NEGATIVE_INFINITY;
  var invalid                   = 51448845651;
  var valid1                    = 191;
  var valid2                    = 39053344705;

  t.equal(clientEngine.validateCPF(invalidBadFormat), false,
    "Bad formated CPF .......................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidDecimal), false,
    "Decimal numbers ........................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidNaN), false,
    "NaN ....................................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidPositiveInfinity), false,
    "Positive Infinity ......................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidNegativeInfinity), false,
    "Negative Infinity ......................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalid), false,
    "Invalid CPF ............................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(valid1), true,
    "#1 Valid CPF (left zeros) ................. should be validated as true");
  t.equal(clientEngine.validateCPF(valid2), true,
    "#2 Valid CPF .............................. should be validated as true");
});

test('#2 - Testing a function that validates a client...', function (t) {
  // number of assertions
  t.plan(5);

  // set timeout in ms for performance coverage
  t.timeoutAfter(50);

  var nullClient = null;
  var emptyClient = {};
  var partialClient = { cpf: 39053344705 };
  var invalidClient = {
    cpf:          39053344705,
    name:         'Breno Souza',
    email:        'breno.ec@gmail.com',
    marital:      'alone in the darkness',
    address: {
      information:    'none',
      postcode:       '99999999'
    },
    phones:       [ '999999999999' ]
  }

  var client = {
    cpf:          39053344705,
    name:         'Breno Souza',
    email:        'breno.ec@gmail.com',
    marital:      'single',
    address: {
      information:    'none',
      postcode:       '99999999'
    },
    phones:       [ '999999999999' ]
  }

  t.equal(clientEngine.validate(nullClient), false,
    "Null Client ............................... should be evaluated to false");
  t.equal(clientEngine.validate(emptyClient), false,
    "Empty Client Object ....................... should be evaluated to false");
  t.equal(clientEngine.validate(partialClient), false,
    "Partial Client Object ..................... should be evaluated to false");    // TODO: explore other alternatives
  t.equal(clientEngine.validate(invalidClient), false,
    "Invalid Client Object ..................... should be evaluated to false");    // TODO: explore other alternatives
  t.equal(clientEngine.validate(client), true,
    "Client Object ............................. should be validated as true");
});
