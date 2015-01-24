var yeoman   = require('yeoman-generator'),
    util     = require('util'),
    fs       = require('fs'),
    gulpif   = require('gulp-if'),
    Config   = require('../../util/config'),
    // rename   = require('../../util/renamer'),
    rename   = require('gulp-rename'),
    Replacer = require('../../util/Replacer'),
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
				message: 'Does this all look correct?',
				name: 'confirm',
				type: 'confirm'
			}], function(i) {
				if (i.confirm) {
					me.input = input;
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
			console.log(path);
			path.basename = path.basename.replace('plugin-name', me.pluginSlug);
		})
	);

	this.remote('tommcfarlin', 'WordPress-Plugin-Boilerplate', 'master', function(err, remote) {
	  remote.directory('plugin-name/trunk', me.destPath);
		
		me.logger.verbose('WordPress Plugin boilerplte downloaded.');
		me.files = {
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
		};
/*
		me.fs.commit([
				rename({src: 'plugin-name', dest: me.pluginSlug})		
			], function() {
				console.log('fs done');
			}
		);*/

		

		// me.fs.move(me.destPath + '/plugin-name.php', me.files.bootstrap.file);
	 //  me.fs.move(me.destPath + '/includes/class-plugin-name.php', me.files.core.file);  
	 //  me.fs.move(me.destPath + '/includes/class-plugin-name-activator.php', me.files.activator.file);  
	 //  me.fs.move(me.destPath + '/includes/class-plugin-name-deactivator.php', me.files.deactivator.file);  
	 //  me.fs.move(me.destPath + '/includes/class-plugin-name-loader.php', me.files.loader.file);  
	 //  me.fs.move(me.destPath + '/includes/class-plugin-name-i18n.php', me.files.i18n.file);  
	 //  me.fs.move(me.destPath + '/public/class-plugin-name-public.php', me.files.publicClass.file);
	 //  me.fs.move(me.destPath + '/public/partials/plugin-name-public-display.php', me.files.publicView.file);
	 //  me.fs.move(me.destPath + '/public/js/plugin-name-public.js', me.files.publicJS.file);
	 //  me.fs.move(me.destPath + '/public/css/plugin-name-public.css', me.files.publicCSS.file);
	 //  me.fs.move(me.destPath + '/admin/class-plugin-name-admin.php', me.files.adminClass.file);
	 //  me.fs.move(me.destPath + '/admin/partials/plugin-name-admin-display.php', me.files.adminView.file);
	 //  me.fs.move(me.destPath + '/admin/js/plugin-name-admin.js', me.files.adminJS.file);
	 //  me.fs.move(me.destPath + '/admin/css/plugin-name-admin.css', me.files.adminCSS.file);
	 //  me.fs.move(me.destPath + '/languages/plugin-name.pot', me.files.language.file);

		/*fs.rename(me.destPath + '/plugin-name.php', me.files.bootstrap.file, cb);
	  fs.rename(me.destPath + '/includes/class-plugin-name.php', me.files.core.file, cb);  
	  fs.rename(me.destPath + '/includes/class-plugin-name-activator.php', me.files.activator.file, cb);  
	  fs.rename(me.destPath + '/includes/class-plugin-name-deactivator.php', me.files.deactivator.file, cb);  
	  fs.rename(me.destPath + '/includes/class-plugin-name-loader.php', me.files.loader.file, cb);  
	  fs.rename(me.destPath + '/includes/class-plugin-name-i18n.php', me.files.i18n.file, cb);  
	  fs.rename(me.destPath + '/public/class-plugin-name-public.php', me.files.publicClass.file, cb);
	  fs.rename(me.destPath + '/public/partials/plugin-name-public-display.php', me.files.publicView.file, cb);
	  fs.rename(me.destPath + '/public/js/plugin-name-public.js', me.files.publicJS.file, cb);
	  fs.rename(me.destPath + '/public/css/plugin-name-public.css', me.files.publicCSS.file, cb);
	  fs.rename(me.destPath + '/admin/class-plugin-name-admin.php', me.files.adminClass.file, cb);
	  fs.rename(me.destPath + '/admin/partials/plugin-name-admin-display.php', me.files.adminView.file, cb);
	  fs.rename(me.destPath + '/admin/js/plugin-name-admin.js', me.files.adminJS.file, cb);
	  fs.rename(me.destPath + '/admin/css/plugin-name-admin.css', me.files.adminCSS.file, cb);
	  fs.rename(me.destPath + '/languages/plugin-name.pot', me.files.language.file, cb);*/

		done();
	});
};

Generator.prototype.nameThoseBabies = function() {

	

  

};