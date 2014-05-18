var express = require('express');
var router = express.Router();

// check if US
function isUS(country) {
  return country === "United States";
}

var _ = require('underscore-node');

// ordinarily in a production env we'd use a 
// distributed cache like redis or memcache 
function Cache() {
  this._mem = {};
}

Cache.prototype = {
  get: function (key) {
    return this._mem[key];
  },
  put: function (key, value) {
    this._mem[key] = value;
    return this;
  },
  keys: function () {
    return _.keys(this._mem);
  }
};

// simple data model for airports
var Airport = {};

Airport.from = function (row) {
  var headers = [
    'id', 'name', 'city', 'country', 'iata', 'icao', 'latitude', 'longitude', 'altitude', 'timezone', 'dst'
  ];
  var items = _.zip(headers, row);
  return _.object(items);
};

var airports = 0;
var cache = new Cache();
var csv = require('csv');

// load airports from source file
csv()
  .from.path(__dirname+'/../data/airports.dat', { delimiter: ',', escape: '"' })
  .transform(function(row) {
    var airport = Airport.from(row);
    if (isUS(airport.country)) {
      cache.put(airport.name, airport);
      cache.put(airport.iata, airport);
      airports += 1;
    }
    return row;
  })
  .on('end', function (count) { 
    console.log('Found '+airports+' US airports');
  });

/* GET airports listing. */
router.get('/', function(req, res) {
  if (_.has(req.query, 'q')) {
    res.send(cache.get(req.query['q']));
  } else {
    res.send(cache.keys());
  }
});

module.exports = router;
