var es       = require('event-stream'),
    Replacer = require('./replacer');


module.exports = function(options){

  var replacer = new Replacer();
  var fullClassName = options.className;

  if (options.classPrefix !== '') {
    fullClassName = options.classPrefix + '_' + fullClassName;
  }

  // Base replacements
  replacer.add(/(class-)plugin-name/g, '$1' + fullClassName.toLowerCase().replace('_','-'));
  replacer.add(/((?:deactivate)|(?:activate)|(?:run))_plugin_name/g, '$1_' + options.pluginSlug.replace('-', '_'));
  // replacer.add(/Plugin_Name_Admin/g, options.className + '_Admin');
  replacer.add(/Plugin_Name/g, fullClassName );
  replacer.add(/Plugin Name\./g, options.humanName);
  replacer.add(/Your Name <email@example\.com>/g, options.author + ' <' + options.authorEmail + '>');
  replacer.add(/1\.0\.0/g, options.pluginVersion);
  replacer.add(/Your Name or (?:\w+\s)?Company(?:\s\w+)?/g, options.copyright);
  replacer.add(/(Author URI:\s*).*/g, '$1' + options.authorURI);
  replacer.add(/(Plugin Name:\s*).*/g, '$1' + options.humanName);  
  replacer.add(/(@link\s*).*/g, '$1' + options.pluginURI);
  replacer.add(/(Plugin URI:\s*).*/g, '$1' + options.pluginURI);
  replacer.add(/'plugin-name'/g, '\'' + options.pluginSlug + '\'');
  replacer.add(/plugin-name(-\w+)(?=(?:\.css)|(?:\.js))/g, options.pluginSlug + '$1');

  function modifyFile(file, cb){
    var str;
  
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error('renamer: Streaming not supported'));
    
    str = file.contents.toString('utf8');
    file.contents = new Buffer(replacer.replace(str));

    cb(null, file);
  }

  return es.map(modifyFile);
};