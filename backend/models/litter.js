//id, coordinates, text
//id will auto populate with mongo
//unknown type for coordinates

var mongoose = require('mongoose');

module.exports = mongoose.model('Litter', {
  coordinates: type,
  text: String
})
