var test         = require('tape');
var clientEngine = require('../public/javascripts/climan/services/ClientsEngineService');

test('Testing a function that validates CPF number...', function (t) {
  // number of assertions
  t.plan(7);

  // set timeout in ms for performance coverage
  t.timeoutAfter(50);

  var invalidBadFormat          = 'OhThisIsStr';
  var invalidDecimal            = 514.48845651;
  var invalidNaN                = Number.NaN;
  var invalidPositiveInfinity   = Number.POSITIVE_INFINITY;
  var invalidNegativeInfinity   = Number.NEGATIVE_INFINITY;
  var invalid                   = 51448845651;
  var valid                     = 39053344705;

  t.equal(clientEngine.validateCPF(invalidBadFormat), false,
    "Bad formated CPF ...... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidDecimal), false,
    "Decimal numbers ....... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidNaN), false,
    "NaN ................... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidPositiveInfinity), false,
    "Positive Infinity ..... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalidNegativeInfinity), false,
    "Negative Infinity ..... should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalid), false,
    "Invalid CPF ........... should be evaluated to false");

  // TODO: validate cpf algorithm
  t.equal(clientEngine.validateCPF(valid), true,
    "Valid CPF ............. should be validated as true");
});
