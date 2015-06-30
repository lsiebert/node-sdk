var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

gulp.task('lint', function () {
    return gulp.src(['index.js', 'lib/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
});


gulp.task('test', function() {
  return gulp.src(['test/*.test.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['lint', 'test']);
});

// define the default task and add the watch task to it
gulp.task('default', ['watch']);
