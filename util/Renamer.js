var es = require('event-stream');

module.exports = function(opts){

  function modifyFile(file, cb){
    // if (file.isNull()) return cb(null, file); // pass along
      // if (file.isStream()) return cb(new Error('renamer: Streaming not supported'));
      process.stdout.write('cock');
    // console.log(file);
    // var str = file.contents.toString('utf8');
    // file.contents = new Buffer(beautify.beautifyJs(str, opts));
    cb(null, file);
  }

  return es.map(modifyFile);
};