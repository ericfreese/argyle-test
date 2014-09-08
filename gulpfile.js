var gulp      = require('gulp'),
    sass      = require('gulp-ruby-sass'),
    prefix    = require('gulp-autoprefixer'),
    connect   = require('gulp-connect'),

    errorHandler = function(e) {
      console.error('\x07', 'Error: ', e);
    };

gulp.task('html', function() {
  gulp.src('./src/html/**/[^_]*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  gulp.src('./src/sass/[^_]*.scss')
    .pipe(sass({
      style: 'expanded'
    })).on('error', errorHandler)
    .pipe(prefix())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch([ './src/html/**/*.html' ], [ 'html' ]);
  gulp.watch([ './src/sass/**/*' ], [ 'css' ]);
});

gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    port: 8080
  })
});

gulp.task('dist', [
  'html',
  'css'
]);

gulp.task('dev', [
  'dist',
  'serve',
  'watch'
]);
