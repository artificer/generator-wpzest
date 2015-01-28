var _s = require('underscore.string');

module.exports = function(slug, defaults) {

	// Validate required
	var requiredValidate = function(value) {
		if (value === '') {
			return 'This field is required.';
		}
		return true;
	};

	if(defaults.staging === undefined) {
		defaults.staging = {};
	}

	return [
		{
	    name: 'setupStaging',
	    message: 'Setup deployment to a staging server?',
	    type: 'confirm'
	  }, {
	    name: 'staging.url',
	    message: 'Staging URL?',
	    default: defaults.staging.url || null
	  }, {
			name: 'stagingHost',
	    message: 'SSH hostname for the staging server?',
	    default: defaults.staging.host || null
		}, {
			name: 'stagingUser',
	    message: 'SSH username for the staging server?',
	    default: defaults.staging.user || null
		}, {
			name: "stagingPort",
      message: "SSH port for staging server?",
      default: 22 
    }, {
	  	name: 'stagingPath',
	    message: 'Path to site root on staging server?',
	    default: defaults.staging.sitePath || null
	  }, {
	  	name: 'stagingWPPath',
	    message: 'Path to WP root on staging server?',
	    default: function(args) {
	    	return args.stagingPath;
	    }
	  }, {
      name: "stagingUploadsPath",
      message: "Path to uploads folder on staging server?",
      default: function (args) {
        return args.stagingWPPath + '/wp-content/uploads';
      }
    } 
	];
};
