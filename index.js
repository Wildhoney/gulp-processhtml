var through = require('through')
  , os = require('os')
  , path = require('path')
  , gutil = require('gulp-util')
  , PluginError = gutil.PluginError
  , File = gutil.File
  , fs = require('fs')
  , transformer;


transformer = {
  replace: function (content, section, line, asset) {
    return content.replace(line, section.indent + asset);
  },

  attr: function (content, section, line, lineContent) {
    var reg, replaced;
    // only run attr replacer for the block content
    reg = new RegExp('(\\s*(?:' + section.attr + ')=[\'"])(.*)?(".*)', 'gi');
    replaced = lineContent.replace(reg, function (wholeMatch, start, asset, end) {
      // check if only the path was provided to leave the original asset name intact
      asset = (!path.extname(section.asset) && /\//.test(section.asset))? section.asset + path.basename(asset) : section.asset;
        return start + asset + end;
    });
    return content.replace(line, replaced);
  },

  css: function (content, section, line) {
    return transformer.replace(content, section, line, '<link rel="stylesheet" href="' + section.asset + '">');
  },

  js: function (content, section, line) {
    return transformer.replace(content, section, line, '<script src="' + section.asset + '"></script>');
  },

  remove: function (content, section, line) {
    var escaped = line.replace(/([.?*+\^=!:$\[\]\\(){}|\-])/g, '\\$1')
      , regReplace = new RegExp(escaped.replace(/^\s*|[\r\n]+\s*/g, '\\s*').replace(/\n{1}$/g, '\\n'));
    return content.replace(regReplace, '');
  },

  include: function (content, section, line, asset) {
    var file = fs.readFileSync(path.join(__dirname, section.asset), 'utf8')
      , i
      , l;

    // return content.replace(line, section.indent + file.toString().trim());

    l = line.length;
    
    while ((i = content.indexOf(line)) !== -1) {
      content = content.substring(0, i) + 
        section.indent + file.toString().trim() + content.substring(i + l);
    }
    return content;
  }
};

function findSections(content, marker) {
  var lines
    , line
    , i
    , l
    , sections = []
    , section
    , regStart
    , regEnd
    , inside
    , buildStart
    , buildEnd
    , attr;

  regStart = new RegExp('<!--\\s*' + marker + ':(\\[?[\\w-]+\\]?)(?::(\\w+))?(?:\\s*([^\\s]+)\\s*-->)*');
  regEnd = new RegExp('(?:<!--\\s*)*\\/' + marker + '\\s*-->');
  lines = content.replace(/\r\n/g, '\n').split(/\n/);
  l = lines.length;

  for (i = 0; i < l; i += 1) {
    line = lines[i];
    buildStart = line.match(regStart);
    buildEnd = regEnd.test(line);

    if (buildStart) {
      inside = true;
      attr = buildStart[1].match(/(?:\[([\w-]+)\])*/)[1];
      section = {
        type: attr ? 'attr' : buildStart[1],
        attr: attr,
        target: buildStart[2],
        asset: buildStart[3],
        indent: /^\s*/.exec(line)[0],
        raw: []
      };
    }

    if (inside && section) {
      section.raw.push(line);
    }

    if (inside && buildEnd) {
      inside = false;
      sections.push(section);
    }
  }
  return sections;
}


module.exports = function(fileName, opt){

  var buffer = []
    , firstFile;


  if (!fileName) {
    throw new PluginError('gulp-processhtml',  'Missing fileName option for gulp-processhtml');
  }

  opt = opt || {};
  opt.newLine = opt.newLine || gutil.linefeed;
  opt.marker = opt.marker || 'build';

  function processContents(file) {
    var contents
      , sections
      , section
      , line
      , content
      , i
      , l;

    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-processhtml',  'Streaming not supported'));
    }

    if (!firstFile) {
      firstFile = file;
    }

    contents = file.contents.toString('utf8');
    sections = findSections(contents, opt.marker);

    l = sections.length;
    for (i = 0; i < l; i += 1) {
      section = sections[i];
      line = section.raw.join(opt.newLine);
      content = section.raw.slice(1, -1).join(opt.newLine);
      contents = transformer[section.type](contents, section, line, content);
    }
    buffer.push(contents);
  }

  function endStream(){
    var joinedContents
      , joinedPath
      , joinedFile;

    if (buffer.length === 0) {
      return this.emit('end');
    }

    joinedContents = buffer.join(opt.newLine);
    joinedPath = path.join(firstFile.base, fileName);

    joinedFile = new File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: joinedPath,
      contents: new Buffer(joinedContents)
    });


    this.emit('data', joinedFile);
    this.emit('end');
  }

  return through(processContents, endStream);
};

