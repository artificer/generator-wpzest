var yeoman   = require('yeoman-generator'),
    util     = require('util'),
    fs       = require('fs'),
    gulpif   = require('gulp-if'),
    Config   = require('../../util/config'),
    // rename   = require('../../util/renamer'),
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
Generator.prototype.specifyMe = function() { 
	
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
					console.log();
					getInput();
				}
			});
		});
	}

	getInput();
};


Generator.prototype.getTheStuff = function() {

	var done     = this.async(),
	    me       = this;

  var cb = function(err) {
	  if (err) throw err;
	};

	this.registerTransformStream(
		rename(function (path) {
			path.basename = path.basename.replace('plugin-name', me.pluginSlug);
		})
	);

	this.registerTransformStream(replace(me.input));

	this.remote('tommcfarlin', 'WordPress-Plugin-Boilerplate', 'master', function(err, remote) {
	  remote.directory('plugin-name/trunk', me.destPath);
		
		me.logger.verbose('WordPress Plugin boilerplte downloaded.');
		/*me.files = {
			bootstrap: new Replacer(me.destPath + '/' + me.pluginSlug + '.php', me),
			uninstall: new Replacer(me.destPath + '/uninstall.php', me),
			readme:    new Replacer(me.destPath + '/README.txt', me),
			core:        new Replacer(me.destPath + '/includes/class-' + me.pluginSlug + '.php', me),    
			activator:   new Replacer(me.destPath + '/includes/class-' + me.pluginSlug + '-activator.php', me),    
			deactivator: new Replacer(me.destPath + '/includes/class-' + me.pluginSlug + '-deactivator.php', me),    
			loader:      new Replacer(me.destPath + '/includes/class-' + me.pluginSlug + '-loader.php', me),    
			i18n:        new Replacer(me.destPath + '/includes/class-' + me.pluginSlug + '-i18n.php', me),    
			publicClass: new Replacer(me.destPath + '/public/class-' + me.pluginSlug + '-public.php', me),
			publicView:  new Replacer(me.destPath + '/public/partials/' + me.pluginSlug + '-public-display.php', me),
			publicJS:    new Replacer(me.destPath + '/public/js/' + me.pluginSlug + '-public.js', me),
			publicCSS:   new Replacer(me.destPath + '/public/css/' + me.pluginSlug + '-public.css', me),
			adminClass: new Replacer(me.destPath + '/admin/class-' + me.pluginSlug + '-admin.php', me),
			adminView:  new Replacer(me.destPath + '/admin/partials/' + me.pluginSlug + '-admin-display.php', me),
			adminJS:    new Replacer(me.destPath + '/admin/js/' + me.pluginSlug + '-admin.js', me),
			adminCSS:   new Replacer(me.destPath + '/admin/css/' + me.pluginSlug + '-admin.css', me),
			language: new Replacer(me.destPath + '/languages/' + me.pluginSlug + '.pot', me)
		};*/

		done();
	});
};

Generator.prototype.nameThoseBabies = function() {

	

  

};