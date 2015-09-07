
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

module.exports = mongoose.model('Client', ClientSchema);
