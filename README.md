#gulp-processhtml

This gulp-plugin uses Denis Ciccale's [node-htmlprocessor](https://github.com/dciccale/node-htmlprocessor),
to process/transform html files.

###Install the dependencies:

`npm install -g gulp`

`npm install gulp-processhtml`

###Use it in your gulpfile

```
var gulp = require('gulp')
  , processhtml = require('gulp-processhtml')
  , opts = { /* plugin options */ };

gulp.task('default', function () {
  gulp.src('./*.html')
    .pipe(processhtml(opts))
    .pipe(gulp.dest('dist'));
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

###Credits

[Denis Ciccale](https://twitter.com/tdecs)


**Feel free to ask me to transfer this repo to your GitHub account if you want to maintain it.**


