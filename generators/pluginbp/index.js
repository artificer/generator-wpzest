var yeoman   = require('yeoman-generator')
    util     = require('util')
    YPConfig = require('../../node_modules/generator-wordpress/util/config');
    YPLogger = require('../../node_modules/generator-wordpress/util/log');

// Export the module
module.exports = Generator;

// Extend the base generator
function Generator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	// Log level option
	this.option('log', {
		desc: 'The log verbosity level: [ verbose | log | warn | error ]',
		defaults: 'log',
		alias: 'l',
		name: 'level'
	});

	// This makes `pluginname` a required argument.
  this.argument('pluginName', { type: String, required: true });

  // Setup the logger
	this.logger = Logger({
		level: this.options.log
	});

	// Load the YeoPress config
	this.YPconf = new YPConfig();
};
util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.cock = function() {

	var done     = this.async(),
	    me       = this
	    destPath = this.YPconf.get('contentDir') + '/plugins/' + this.pluginName;

	this.remote('tommcfarlin', 'WordPress-Plugin-Boilerplate', 'master', function(err, remote) {
	  remote.bulkDirectory('plugin-name/trunk', destPath);
		this.logger.verbose('WordPress Plugin boilerplte downloaded.');
		done();
	});
};

Generator.prototype.fester = function() {
	console.log('fester');
};