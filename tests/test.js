var test         = require('tape');
var clientEngine = require('../engines/clientEngine');

test('Testing function that validates CPF number', function (t) {
  // number of assertions
  t.plan(3);

  // set timeout in ms for performance coverage
  t.timeoutAfter(50);

  var invalidBadFormat  = 'OhThisIsStr';
  var invalid           = 51448845651;
  var valid             = 39053344705;

  t.equal(clientEngine.validateCPF(invalidBadFormat), false,
    "Bad formated CPF should be evaluated to false");
  t.equal(clientEngine.validateCPF(invalid), false,
    "Invalid CPF should be evaluated to false");
  t.equal(clientEngine.validateCPF(valid), true,
    "Valid CPF should be validated as true");
});
