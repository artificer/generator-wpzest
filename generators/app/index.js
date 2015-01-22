var yeoman = require('yeoman-generator')
    util   = require('util');
// Export the module
module.exports = Generator;

// Extend the base generator
function Generator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
};
util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.cock = function() {
	this.composeWith('wordpress', {}, {
	  local: require.resolve('generator-wordpress')
	});
};

Generator.prototype.fester = function() {
	console.log('fester');
};