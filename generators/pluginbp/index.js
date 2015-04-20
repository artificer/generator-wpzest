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
	
	this.pluginPath = function(file) {

		var path;
		file = file || '';

		if(file === '') {
			path = this.destinationPath( this.YPconf.get('contentDir') + '/plugins/' + this.pluginSlug );
		} else {
			path = this.destinationPath( this.YPconf.get('contentDir') + '/plugins/' + this.pluginSlug + '/' + file );
		}

		return path;
	}; 
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

	this.remote('DevinVinson', 'WordPress-Plugin-Boilerplate', 'master', function(err, remote) {
	  remote.directory('plugin-name/trunk', me.pluginPath());
		me.logger.verbose('WordPress Plugin boilerplte downloaded.');
		done();
	});
};

Generator.prototype.gruntMe = function() {

	

	this.logger.verbose('Setting up Grunt.');

	this.fs.copyTpl(
		this.templatePath('Gruntfile.js.tmpl'),
		this.pluginPath('Gruntfile.js'),
		{gen: this}
	);

	this.fs.copyTpl(
		this.templatePath('package.json.tmpl'),
		this.pluginPath('package.json'),
		{gen: this}
	);

	this.fs.write(
		this.pluginPath('public/scss/' + this.input.pluginSlug + '-public.scss'), 
		'');
	this.fs.write(
		this.pluginPath('admin/scss/' + this.input.pluginSlug + '-admin.scss'), 
		'');

	
};

Generator.prototype.bowerMe = function() {

	this.logger.verbose('Setting up Bower.');

	this.fs.copyTpl(
		this.templatePath('.bowerrc.tmpl'),
		this.pluginPath('.bowerrc'),
		{gen: this}
	);

	this.fs.copyTpl(
		this.templatePath('bower.json.tmpl'),
		this.pluginPath('bower.json'),
		{gen: this}
	);
};

Generator.prototype.install = function() {

	var createVendors = function(cb) {
		fs.mkdir('public/vendor', function(err) {
			if(err) {
				console.log(err);
				return cb(err);
			}
			cb(null);
		});
	};

	this.logger.verbose('Installing packages. This will probably take a minute.');
	process.chdir(this.pluginPath());
	this.installDependencies();
	createVendors.bind(this)(function(err) {});

};

