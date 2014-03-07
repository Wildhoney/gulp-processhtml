var processhtml = require('../')
  , should = require('should')
  , os = require('os')
  , path = require('path')
  , File = require('gulp-util').File
  , Buffer = require('buffer').Buffer;

require('mocha');

describe('gulp-processhtml', function() {

  describe('processhtml()', function() {

    it('should processhtml comments', function(done) {
      var stream = processhtml('processed.html')
        , fakeFile = new File({
            cwd:  './',
            base: './',
            path: './file.html',
            contents: new Buffer([
              '<!doctype html>',
              '<html>',
              '<head>',
              ' <!-- build:css style.min.css -->',
              ' <link  rel="stylesheet" href="style.css">',
              ' <!-- /build -->',
              '</head>',
              '<body>',
              '  <!-- build:js app.min.js -->',
              '  <script src="app.js"></script>',
              '  <!-- /build -->',
              '</body>',
              '</html>'
            ].join('\n'))
        });

      stream.on('data', function (newFile) {
        var newFilePath
          , expectedFilePath;

        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFilePath = path.resolve(newFile.path);
        expectedFilePath = path.resolve('./processed.html');
        newFilePath.should.equal(expectedFilePath);

        newFile.relative.should.equal('processed.html');

        Buffer.isBuffer(newFile.contents).should.equal(true);
        String(newFile.contents).should.equal([
            '<!doctype html>',
            '<html>',
            '<head>',
            ' <link rel="stylesheet" href="style.min.css">',
            '</head>',
            '<body>',
            '  <script src="app.min.js"></script>',
            '</body>',
            '</html>'
          ].join('\n'));


        done();
      });
      stream.write(fakeFile);
      stream.end();
    });

    it('should remove content', function(done) {
      var stream = processhtml('processed.html')
        , fakeFile = new File({
            cwd:  './',
            base: './',
            path: './file.html',
            contents: new Buffer([
              '<!doctype html>',
              '<html>',
              '<head></head>',
              '<body>',
              '  <!-- build:remove -->',
              '  <script src="livereload.js"></script>',
              '  <!-- /build -->',
              '</body>',
              '</html>'
            ].join('\n'))
        });

      stream.on('data', function (newFile) {
        var newFilePath
          , expectedFilePath;

        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        Buffer.isBuffer(newFile.contents).should.equal(true);
        String(newFile.contents).should.equal([
            '<!doctype html>',
            '<html>',
            '<head></head>',
            '<body>',
            '</body>',
            '</html>'
          ].join('\n'));

        done();
      });
      stream.write(fakeFile);
      stream.end();
    });

    it('should transform attributes', function(done) {
      var stream = processhtml('processed.html')
        , fakeFile = new File({
            cwd:  './',
            base: './',
            path: './file.html',
            contents: new Buffer([
              '<!doctype html>',
              '<html>',
              '<head></head>',
              '<body>',
              '  <!-- build:[src] app.js -->',
              '  <script src="livereload.js"></script>',
              '  <!-- /build -->',
              '</body>',
              '</html>'
            ].join('\n'))
        });

      stream.on('data', function (newFile) {
        var newFilePath
          , expectedFilePath;

        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        Buffer.isBuffer(newFile.contents).should.equal(true);
        String(newFile.contents).should.equal([
            '<!doctype html>',
            '<html>',
            '<head></head>',
            '<body>',
            '  <script src="app.js"></script>',
            '</body>',
            '</html>'
          ].join('\n'));

        done();
      });
      stream.write(fakeFile);
      stream.end();
    });


    it('should include files', function(done) {
      var stream = processhtml('processed.html')
        , fakeFile = new File({
            cwd:  './',
            base: './',
            path: './file.html',
            contents: new Buffer([
              '<!doctype html>',
              '<html>',
              '<head>',
              '  <style>',
              '    <!-- build:include test/fixtures/styles.css -->',
              '      <!-- Me thinks it should replace whatever is in between the build tags -->',
              '      <div>FOO</div>',
              '    <!-- /build -->',
              '  </style>',
              '</head>',
              '<body>',
              '</body>',
              '</html>'
            ].join('\n'))
        });

      stream.on('data', function (newFile) {
        var newFilePath
          , expectedFilePath;

        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        Buffer.isBuffer(newFile.contents).should.equal(true);
        String(newFile.contents).should.equal([
            '<!doctype html>',
            '<html>',
            '<head>',
            '  <style>',
            '    body { background: teal; }',
            '  </style>',
            '</head>',
            '<body>',
            '</body>',
            '</html>'
          ].join('\n'));

        done();
      });
      stream.write(fakeFile);
      stream.end();
    });

  });
});

