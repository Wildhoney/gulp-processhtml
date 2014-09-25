'use strict';

var assert = require('assert')
  , os = require('os')
  , fs = require('fs')
  , path = require('path')
  , through = require('through2')
  , gulp = require('gulp')
  , htmlprocessor = require('../');

require('mocha');


function process(input, options, output, done) {
  options = options || {};
  gulp
    .src(input)
    .pipe(htmlprocessor(options))
    .pipe(through.obj(function (file, enc) {

      var actual = file.contents.toString(enc);

      fs.readFile(output, function (err, data) {
        assert.deepEqual(actual, data.toString(enc));
        done();
      });
    }));
}

describe('gulp-processhtml', function () {

  it('should process html comments', function (done) {
    process('test/fixtures/basic.html', null, 'test/expected/basic.html', done);
  });

  it('should remove content', function (done) {
    process('test/fixtures/remove.html', null, 'test/expected/remove.html', done);
  });

  it('should transform attributes', function (done) {
    process('test/fixtures/attributes.html', null, 'test/expected/attributes.html', done);
  });

  it('should include files', function (done) {
    process('test/fixtures/include.html', null, 'test/expected/include.html', done);
  });

});
