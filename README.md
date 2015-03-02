# gulp-processhtml

Gulp plugin uses Denis Ciccale's [node-htmlprocessor](https://github.com/dciccale/node-htmlprocessor)
to process/transform html files.

![Travis](http://img.shields.io/travis/Wildhoney/gulp-processhtml.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/gulp-processhtml.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)

* **npm:** `npm install gulp-processhtml --save-dev`

## Gulpfile

```js
var gulp = require('gulp'),
    processhtml = require('gulp-processhtml')
    opts = { /* plugin options */ };

gulp.task('default', function () {
    return gulp.src('./*.html')
               .pipe(processhtml(opts))
               .pipe(gulp.dest('dist'));
});
```

## Example Usage

You might need to change some attributes in your html, when you're releasing
for a different environment.

Using this plugin, you can transform this:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- build:css style.min.css -->
  <link rel="stylesheet" href="css/style.css">
  <!-- /build -->
</head>
<body>

  <!-- build:js app.min.js -->
  <script src="app.js"></script>
  <!-- /build -->

  <!-- build:remove -->
  <script src="http://192.168.0.1:35729/livereload.js?snipver=1"></script>
  <!-- /build -->

  <!-- build:replace 'Goodbye Livereload...' -->
  <script src="http://192.168.0.1:35729/livereload.js?snipver=1"></script>
  <!-- /build -->

</body>
</html>
```

To this:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.min.css">
</head>
<body>
  <script src="app.min.js"></script>
  Goodbye Livereload...
</body>
</html>
```

## Credits

[Denis Ciccale](https://twitter.com/tdecs)