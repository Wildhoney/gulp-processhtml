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

###Example usage 

You might need to change some attributes in your html, when you're releasing
for a different environment. 

Using this plugin, you can transform this:

```
<!DOCTYPE html>
<html>
<head>
  <!--build:css style.min.css -->
  <link rel="stylesheet" href="css/style.css">
  <!--/build-->
</head>
<body>
  
  <!--build:js app.min.js-->
  <script src="app.js"></script>
  <!--/build -->
  
  <!--build:remove-->
  <script src="http://192.168.0.1:35729/livereload.js?snipver=1"></script>
  <!--/build-->
</body>
</html>
```

To this:

```
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.min.css">
</head>
<body>
  <script src="app.min.js"></script>
</body>
</html>
```


