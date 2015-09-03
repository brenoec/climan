
module.exports = {

  // Returns true if CPF is valid. False otherwise.
  validateCPF: function(cpf) {

    var type = typeof cpf;

    // 1. format validation
    if (type !== 'number') {
      return false;
    }

    // 2. special values validation

    // switch statement don't catch this
    if (isNaN(cpf)) {
      return false;
    }

    switch (cpf) {
      case Number.POSITIVE_INFINITY:
        return false;

      case Number.NEGATIVE_INFINITY:
        return false;

      default:
        break;
    }

    // decimal validation
    if (Math.round(cpf) !== cpf) {
      return false;
    }

    // 3. CPF validation
    var digits = ("" + cpf).split("").map(Number);
    var v = [];
    v[0] = 0;
    v[1] = 0;

    for (var i = 1; i < 9; i++) {
      v[0] += (i + 1) * digits[i];
      v[1] += i * digits[i];
    }

    v[0] += digits[0];
    v[0] = v[0] % 11;
    v[0] = v[0] % 10;

    v[1] += 9 * v[0];
    v[1] = v[1] % 11;
    v[1] = v[1] % 10;

    if (v[0] === digits[9] && v[1] === digits[10]) {
      return true;
    }

    return false;
  }

};
