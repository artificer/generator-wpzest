/*
Copyright 2013 Thiago Locks

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var fs = require('fs');

var Replacer = module.exports = function Replacer(file, options) {
  var module = {},
    searches = [];

  module.add = function (search, replace) {
    searches.push({search: search, replace: replace});
  };

  module.rm = function (search) {
    searches.push({search: search, replace: ''});
  };

  module.file = file;

  // Base replacements
  module.add(/plugin-name/g, options.pluginSlug);
  module.add(/Plugin_Name_Admin/g, options.pluginClassName + '_Admin');
  module.add(/Plugin_Name/g, options.pluginClassName);
  module.add(/Plugin Name\./g, options.pluginName);
  module.add(/Your Name <email@example\.com>/g, options.author + ' <' + options.authorEmail + '>');
  module.add(/1\.0\.0/g, options.pluginVersion);
  module.add(/Your Name or Company Name/g, options.pluginCopyright);

  module.replace = function () {
    fs.readFile(file, 'utf8', function (err, data) {
      var i, total;
      if (err) {
        return console.log(err);
      }

      total = searches.length;
      for (i = 0; i < total; i += 1) {
        data = data.replace(searches[i].search, searches[i].replace);
      }

      fs.writeFile(file, data, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  };

  return module;
};