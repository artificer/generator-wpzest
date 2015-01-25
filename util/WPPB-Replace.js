var es       = require('event-stream'),
    Replacer = require('./replacer');


module.exports = function(options){

  var replacer = new Replacer();

  // Base replacements
  replacer.add(/plugin-name/g, options.pluginSlug);
  replacer.add(/plugin_name/g, options.pluginSlug.replace('-', '_'));
  // replacer.add(/Plugin_Name_Admin/g, options.className + '_Admin');
  replacer.add(/Plugin_Name/g, options.className);
  replacer.add(/Plugin Name\./g, options.humanName);
  replacer.add(/Your Name <email@example\.com>/g, options.author + ' <' + options.authorEmail + '>');
  replacer.add(/1\.0\.0/g, options.pluginVersion);
  replacer.add(/Your Name or (?:\w+\s)?Company(?:\s\w+)?/g, options.copyright);
  replacer.add(/(Author URI:\s*).*/g, '$1' + options.authorURI);
  replacer.add(/(Plugin Name:\s*).*/g, '$1' + options.humanName);  

  if(options.pluginURI) {
    replacer.add(/(@link\s*).*/g, '$1' + options.pluginURI);
    replacer.add(/(Plugin URI:\s*).*/g, '$1' + options.pluginURI);
  }

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