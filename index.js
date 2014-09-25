var through = require('through2')
  , gutil = require('gulp-util')
  , HTMLProcessor = require('htmlprocessor')
  , PluginError = gutil.PluginError;

module.exports = function(options) {

  var processor = new HTMLProcessor(options);

  function processContent(file, enc, cb) {
    var content;

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-processhtml', 'Streams aren\'t supported'));
      return cb();
    }

    if (file.isBuffer()) {
      content = processor.processContent(file.contents.toString(enc), file.path);

      if (options && options.process) {
        content = processor.template(content, processor.data, options.templateSettings);
      }

      file.contents = new Buffer(content, enc);
    }

    this.push(file);
    cb();
  };

  return through.obj(processContent);
};
