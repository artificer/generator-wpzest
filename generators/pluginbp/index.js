var yeoman   = require('yeoman-generator'),
    util     = require('util'),
    fs       = require('fs'),
    gulpif   = require('gulp-if'),
    Config   = require('../../util/config'),
    rename   = require('gulp-rename'),
    replace  = require('../../util/wppb-replace'),
    YPConfig = require('../../node_modules/generator-wordpress/util/config'),
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

	// This makes `pluginSlug` a required argument.
  this.argument('pluginSlug', { type: String, required: true });

  // Setup the logger
	this.logger = YPLogger({
		level: this.options.log
	});

	// Load the YeoPress config
	this.YPconf = new YPConfig();
	// Load the WPZest config
	this.conf   = new Config();
	this.destPath = this.destinationPath( this.YPconf.get('contentDir') + '/plugins/' + this.pluginSlug );
}
util.inherits(Generator, yeoman.generators.Base);


// Ask the user what they want done
Generator.prototype._specifyMe = function() { 
	
	// This is an async step
	var done = this.async(),
		  me   = this;

	function getInput() {
		me.prompt(require('./prompts')(me.pluginSlug, me.conf.get()), function(input) {
			me.prompt([{
				message: 'Does all this look correct?',
				name: 'confirm',
				type: 'confirm'
			}], function(i) {
				if (i.confirm) {
					me.input = input;
					me.input.pluginSlug = me.pluginSlug;
					//TODO: save plugin configuration to .wpzest
					done();
				} else {
					getInput();
				}
			});
		});
	}

	getInput();
};


Generator.prototype._getTheStuff = function() {

	var done     = this.async(),
	    me       = this;

  var cb = function(err) {
	  if (err) throw err;
	};

	this.registerTransformStream(
		rename(function (path) {
			var classSlug = me.input.className.toLowerCase().replace('_', '-');

			if(me.input.classPrefix !== '') {
				classSlug = me.input.classPrefix.toLowerCase() + '-' + classSlug;
			}

			if (path.basename.indexOf('class') === -1) {
				path.basename = path.basename.replace('plugin-name', me.pluginSlug);
			} else {
				path.basename = path.basename.replace('plugin-name', classSlug);
			}
		})
	);

	this.registerTransformStream(replace(me.input));

	this.remote('tommcfarlin', 'WordPress-Plugin-Boilerplate', 'master', function(err, remote) {
	  remote.directory('plugin-name/trunk', me.destPath);
		me.logger.verbose('WordPress Plugin boilerplte downloaded.');
		done();
	});
};

Generator.prototype.gruntMe = function() {

	var done = this.async();
	fs.readFile('Gruntfile.js', function(err, data) {
		if (err) {
			console.log('Error occured');
		}
	  console.log(data);
	});

	var cb = function() {

	};
};