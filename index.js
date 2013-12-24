
// countries - http://www.webservicex.net/country.asmx
// countries - http://www.webservicex.net/country.asmx/GetCountries


var http = require('http');
var es = require('event-stream');

const webSvc = 'www.webservicex.net';
const endPoint = 'country.asmx';


function Countries () {
  var self = this;
  if (!(self instanceof Countries)) return new Countries();

  self.http_options = {
    hostname: webSvc,
    port: 80,
    agent: false,
    path: '/' + endPoint
  };
}

Countries.prototype.get = function (cb) {
  var self = this;

  self.http_options.path += '/GetCountries'

  function handler (res) {
    if (res.statusCode !== 200) return cb(new Error(res.statusCode));

    res.pipe(es.wait(function (err, text) {
      return cb(err, text);
    }));
  }
  http.get(self.http_options, handler).on('error', cb);
};



var countries = new Countries();

countries.get(function (err, data) {
  console.log(err, data);
});