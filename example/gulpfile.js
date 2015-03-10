(function main() {

    var gulp        = require('gulp'),
        concat      = require('gulp-concat'),
        processhtml = require('../index.js');

    gulp.task('concat', function() {
        gulp.src('js/*.js').pipe(concat('all.js')).pipe(gulp.dest(__dirname));
    });

    gulp.task('processhtml', function() {
        gulp.src('index.html').pipe(processhtml()).pipe(gulp.dest(__dirname));
    });

    gulp.task('default', ['concat', 'processhtml']);

})();