var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  information:    String,
  postcode:       String
});

module.exports = mongoose.model('Address', AddressSchema);
