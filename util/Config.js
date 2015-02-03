var YPConfig = require('../node_modules/generator-wordpress/util/config'),
				util = require('util'),
        path = require('path');

// Constructor
var Config = module.exports = function(locals, globals) {
	// Default config file name
	this.filename = '.wpzest';

	// Load files
	this.global = this.load(path.join(process.env.HOME  || process.env.USERPROFILE, this.filename)) || {};
	this.local  = this.load() || {};

	// Set initial data
	if (locals) this.set(locals);
	if (globals) this.setGlobal(globals);
};
util.inherits(Config, YPConfig);