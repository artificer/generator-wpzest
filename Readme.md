# What is WPZest?

A wrapper around the wonderful [YeoPress](https://github.com/wesleytodd/YeoPress) generator. In addition to the features offered by YeoPress it lets you: 

* setup deployment to staging and production servers
* scaffold plugins based on the WordPress Plugin Boilerplate 

Deployment is handled via [WP-CLI-Deploy](https://github.com/c10b10/wp-cli-deploy).

# Installation

In your terminal:

	npm install -g yo generator-wpzest

WP-CLI-Deploy requires WP-CLI. If you don't already have it, instructions on how to install it can be found [here](http://wp-cli.org/). If you are experiencing issues and happen to be running MAMP then [this](https://github.com/wp-cli/wp-cli/wiki/Alternative-Install-Methods#using-a-custom-php-binary) should prove useful.

# Usage

	yo wpzest

This will run the YeoPress generator and once that is finished it will ask you if you'd like to configure staging and productions servers.

	yo wpzest --skip-yp

If you are already using YeoPress and just want to setup deployment then you can achive that with the `--skip-yp` flag.

__NOTE__: If you have modified `wp-config.php` and `.gitignore` after using YeoPress and use WPZest after that, WPZest may overwrite these files. Make sure you check them.

	yo wpzest:pluginbp <pluign-name>

Scaffolds a plugin based on the WP Plugin Boilerplate in your pluigns folder folder.

# Templates

When installing wordpress through YeoPress the default theme is setup to use RequireJS. If this is not your cup of tea there is a fork of this template maintained [here](https://github.com/citrusmist/YeoPress/tree/template). In order to use it when prompted for the GitHub username replace the default value with `citrusmist`.

It doesn't rely on RequireJS but will require you to load scripts using `wp_enqueue_script` in your dev environment.

# Resources

* [Slides](https://speakerdeck.com/artificermil/front-end-workflow-automation-for-wordpress-theme-and-plugin-development) from Front End Workflow Automation for WordPress Theme and Plugin Development talk


	


