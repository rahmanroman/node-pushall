/**
 * Created by Roman Rahman on 21.10.2015.
 */
var pkg = require('./package.json');
var pushall = require('./lib/pushall.js');

module.version = pkg.version;
module.exports = pushall;