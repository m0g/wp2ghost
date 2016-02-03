#!/usr/bin/node
var wp2ghost = require('../lib/wp2ghost.js');
var path = require('path');

var args = process.argv;
if (args.length === 1 || (args.length === 2 && args[0].match(/node[\-\.\d]*$/) !== null)) {
  console.error("Usage: " + path.relative(process.cwd(), __filename) + " wordpress.xml > ghost.json")
  process.exit();
}

var withImages = false;

if (args.indexOf('--with-images') != -1)
  withImages = true;

process.stdout.write("");
var when = wp2ghost.fromFile(process.argv.slice(-1)[0], withImages);
when.then(function(data) {
  process.stdout.write(JSON.stringify(data).replace(/\\\\n/g, '\\n'));
}, function(err) {
  process.stderr.write(JSON.stringify(err));
});
