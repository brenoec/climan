
var mongoose = require('mongoose');
var Address = require('./Address');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  cpf:        Number,
  name:       String,
  email:      String,
  marital:    String,
  phones:     [Number],
  address:    [Address.schema]
});

ClientSchema.path('marital').validate(function (value) {
  return /married|single/i.test(value);
}, 'Invalid marital status');

ClientSchema.path('address').validate(function (value) {
  if (value.length > 1) {
    return false;
  }

  return true;
}, 'Address array must have only one value');

module.exports = mongoose.model('Client', ClientSchema);
