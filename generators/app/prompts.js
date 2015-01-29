var _s = require('underscore.string');

module.exports = function(defaults) {

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
	    name: 'hasStaging',
	    message: 'Setup deployment to a staging server?',
	    type: 'confirm',
	  }, {
	    name: 'stagingUrl',
	    message: 'Staging URL?',
	    default: defaults.stagingUrl || null,
	    when: function(args) {
	    	return !!args.hasStaging;
	    },
	    validate: requiredValidate
	  }, {
			name: 'stagingHost',
	    message: 'SSH hostname for the staging server?',
	    default: defaults.stagingHost || null,
	    when: function(args) {
	    	return !!args.hasStaging;
	    },
	    validate: requiredValidate
		}, {
			name: 'stagingUser',
	    message: 'SSH username for the staging server?',
	    default: defaults.stagingUser || null,
	    when: function(args) {
	    	return !!args.hasStaging;
	    },
	    validate: requiredValidate
		}, {
			name: "stagingPort",
      message: "SSH port for staging server?",
      default: defaults.stagingPort || 22,
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
	  	name: 'stagingPath',
	    message: 'Path to site root folder on staging server?',
	    default: defaults.stagingPath || null,
	    when: function(args) {
	    	return !!args.hasStaging;
	    },
	    validate: requiredValidate
	  }, {
	  	name: 'stagingWpPath',
	    message: 'Path to WP root on staging server?',
	    default: function(args) {
 				return args.stagingPath;
	    },
	    when: function(args) {
	    	return !!args.hasStaging;
	    },
	    validate: requiredValidate
	  }, {
      name: "stagingUploadsPath",
      message: "Path to uploads folder on staging server?",
      default: function (args) {
        return args.stagingWpPath + '/wp-content/uploads';
      },
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingThemesPath",
      message: "Path to themes folder on staging server?",
      default: function (args) {
        return args.stagingWpPath + '/wp-content/themes';
      },
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingPluginsPath",
      message: "Path to plugins folder on staging server?",
      default: function (args) {
        return args.stagingWpPath + '/wp-content/plugins';
      },
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingDbHost",
      message: "DB host for staging server?",
      default: defaults.stagingDbHost || 'localhost',
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingDbName",
      message: "DB name for staging server?",
      default: defaults.stagingDbName || null,
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingDbUser",
      message: "DB user for staging server?",
      default: defaults.stagingDbUser || null,
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
      name: "stagingDbPass",
      message: "DB password for staging server?",
      default: defaults.stagingDbPass || null,
      when: function(args) {
      	return !!args.hasStaging;
      },
      validate: requiredValidate
    }, {
	    name: 'hasProduction',
	    message: 'Setup deployment to a production server?',
	    type: 'confirm',
	  }, {
	    name: 'productionUrl',
	    message: 'Production URL?',
	    default: defaults.productionUrl || null,
	    when: function(args) {
	    	return !!args.hasProduction;
	    },
	    validate: requiredValidate
	  }, {
			name: 'productionHost',
	    message: 'SSH hostname for the production server?',
	    default: defaults.productionHost || null,
	    when: function(args) {
	    	return !!args.hasProduction;
	    },
	    validate: requiredValidate
		}, {
			name: 'productionUser',
	    message: 'SSH username for the production server?',
	    default: defaults.productionUser || null,
	    when: function(args) {
	    	return !!args.hasProduction;
	    },
	    validate: requiredValidate
		}, {
			name: "productionPort",
      message: "SSH port for production server?",
      default: defaults.productionPort || 22,
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
	  	name: 'productionPath',
	    message: 'Path to site root folder on production server?',
	    default: defaults.productionPath || null,
	    when: function(args) {
	    	return !!args.hasProduction;
	    },
	    validate: requiredValidate
	  }, {
	  	name: 'productionWpPath',
	    message: 'Path to WP root on production server?',
	    default: function(args) {
 				return args.productionPath;
	    },
	    when: function(args) {
	    	return !!args.hasProduction;
	    },
	    validate: requiredValidate
	  }, {
      name: "productionUploadsPath",
      message: "Path to uploads folder on production server?",
      default: function (args) {
        return args.productionWpPath + '/wp-content/uploads';
      },
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionThemesPath",
      message: "Path to themes folder on production server?",
      default: function (args) {
        return args.productionWpPath + '/wp-content/themes';
      },
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionPluginsPath",
      message: "Path to plugins folder on production server?",
      default: function (args) {
        return args.productionWpPath + '/wp-content/plugins';
      },
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionDbHost",
      message: "DB host for production server?",
      default: defaults.productionDbHost || 'localhost',
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionDbName",
      message: "DB name for production server?",
      default: defaults.productionDbName || null,
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionDbUser",
      message: "DB user for production server?",
      default: defaults.productionDbUser || null,
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }, {
      name: "productionDbPass",
      message: "DB password for production server?",
      default: defaults.productionDbPass || null,
      when: function(args) {
      	return !!args.hasProduction;
      },
      validate: requiredValidate
    }

	];
};
