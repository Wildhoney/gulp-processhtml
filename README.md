#gulp-processhtml

This is a port of Denis Ciccale's [grunt-processhtml](https://github.com/dciccale/grunt-processhtml) 
[Grunt](http://www.gruntjs.com) plugin for [gulp.js](http://www.gulpjs.com).

Some things are still missing (includes and templates)

#Usage

###Install the dependencies:

`npm install -g gulp`

`npm install gulp-processhtml`

###Use it in your gulpfile

```
var gulp = require('gulp')
  , processhtml = require('gulp-processhtml');

gulp.task('default', function () {
  gulp.src('index.html')
    .pipe(processhtml('test.html'))
    .pipe(gulp.dest('./'));
});
```

