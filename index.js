var through       = require('through2'),
    PluginError   = require('plugin-error'),
    path          = require('path'),
    HTMLProcessor = require('htmlprocessor');

module.exports = function(options) {

    options = options || {};

    if (!options.customBlockTypes) {
        options.customBlockTypes = [];
    }

    // Add some custom block types.
    options.customBlockTypes.push(path.join(__dirname, 'custom/replace.js'));

    var processor = new HTMLProcessor(options),
        content   = '';

    function processContent(file, enc, cb) {

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

    }

    return through.obj(processContent);

};
