var _s = require('underscore.string');

module.exports = function(slug, defaults) {

	// Validate required
	var requiredValidate = function(value) {
		if (value === '') {
			return 'This field is required.';
		}
		return true;
	};

	if(defaults.author === undefined) {
		defaults.author = {};
	}

	return [
		{
	    name: 'pluginVersion',
	    message: 'What is your new plugin\'s version?',
	    default: '1.0.0'
	  }, {
	    name: 'author',
	    message: 'What is your name?',
	    store: true,
	    default: defaults.author.name || null
	  }, {
	  	name: 'authorEmail',
	    message: 'What is your e-mail?',
	    store: true,
	    default: defaults.author.email || null
	  }, {
			name: 'authorURI',
	    message: 'What is your URL?',
	    store: true,
	    default: defaults.author.url || null
		}, {
			name: 'pluginURI',
	    message: 'What is the plugin URL?',
	    default: defaults.pluginURI || null
		}, {
			name: 'copyright',
	    message: 'What goes in copyright tags?',
	    store: true,
	    default: defaults.author.copyright || null
		}, {
			name: "humanName",
      message: "What is the human-friendly name for the plugin?",
      default: function() {
      	var humanName = _s.humanize(slug);

      	return _s.titleize(humanName);
      },
      validate: function (response) {
        //checks the plugin name to be sure it's alphanumeric
        //we won't be allowing any symbols in the plugin name

        var regex = /^[a-zA-Z0-9\s-_]+$/g;
        if (regex.test(response)) {
          return true;
        } else {
          var errmsg = "Sorry, you cannot use any of these in the name: !@#$%^&*()+=?|;:\'\",.<>~`";
          return errmsg;
        }
      }
    }, {
      name: "classPrefix",
      message: "Default class and file prefix (optional)",
      default: function (args) {
        // var filename = args.humanPluginName;
        // var regex = /[^a-zA-Z0-9]+/g;
        // return filename.replace(regex, '-').toLowerCase();
        return null;
      },
      validate: function (response) {
        var regex = /^[a-zA-Z0-9-]+$/g;
        
        if (response === '' || regex.test(response)){
          return true;
        } else {
          var errmsg = "Sorry, you cannot use whitespace or any of these in the name: !@#$%^&*()+=?|;:\'\",.<>~`";
          return errmsg;
        }
      }
    }, {
	    name: "className",
	    message: "Default Class_Name for plugin (changing this is optional)",
	    default: function (args) {
        var classname = slug;

        // NOTE: I admit. This series of string manipulation isn't awesome, but it works and
        //       is maintainable.
        //
        //       To explain:
        //       1. take the approved and cleaned filename, replacing hyphens with spaces
        //       2. use a well-tested regex for capitalizing The First Letters After Spaces
        //       3. tear the spaces out, replace them with underscores
        //
        //       ...much of this is to conform to the WordPress style guide, more than anything.

        classname = classname.replace(/-/g, ' ');
        classname = classname.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        classname = classname.replace(/\s+/g ,'_');
        return classname;
	    },
	    validate: function (response) {
	      // checks the plugin name to be sure that if the user entered a different string,
	      // the user entered string is a valid PHP Class Name

	      // NOTE WELL: If the user wants to break WordPress coding standards with their class name
	      //            this regex will not reformat it to meet the standard.  At some point, we've got
	      //            to trust the person either knows what they are doing or at least is far enough
	      //            away that they can't hurt us with their tomfoolery.

	      var regex = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;
	      if (regex.test(response)) {
	          return true;
	      } else {
	          var errmsg = "Sorry, but that class name does not conform to PHP standards. Please see the docs and try again.";
	          return errmsg;
	      }
	    }
		}, {
			name: "useGrunt",
			message: "Use Grunt, Bower and Sass w/ Compass",
			default: "N",
			type: "confirm"
		}

	];
};
