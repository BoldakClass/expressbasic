/**
 * Created by Gene on 2/16/2015.
 */
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: __dirname + "/config.json" });

module.exports = nconf;