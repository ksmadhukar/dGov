/* gulpfile.js */
var
  gulp = require('gulp'),
  sass = require('gulp-sass');
  shell = require('gulp-shell');

// source and distribution folder
var
  source = 'src/',
  dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
  in: './node_modules/bootstrap-sass/'
};

// fonts
var fonts = {
  in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
  out: dest + 'fonts/'
};

 // css source file: .scss files
var css = {
  in: source + 'scss/main.scss',
  out: dest + 'css/',
  watch: source + 'scss/**/*',
  devOpts: {
    outputStyle: 'expanded',
    precision: 8,
    errLogToConsole: true,
    includePaths: [bootstrapSass.in + 'assets/stylesheets']
  },
  prodOpts: {
    outputStyle: 'compressed',
    precision: 8,
    errLogToConsole: true,
    includePaths: [bootstrapSass.in + 'assets/stylesheets']
  }
};

// Run drush to clear the theme registry
gulp.task('drush', function() {
  return gulp.src('', {
    read: false
  })
  .pipe(shell([
    'drush cr',
  ]));
});

// include fonts
gulp.task('fonts', function () {
  return gulp.src(fonts.in)
  .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
  return gulp.src(css.in)
  .pipe(sass(css.devOpts))
  .pipe(gulp.dest(css.out));
});

// custom gulp task
gulp.task('serve', ['sass', 'drush'], function () {
  gulp.watch(css.watch, ['sass', 'drush']);
  gulp.watch("js/*.js", ['drush']);
  gulp.watch("templates/**/*.twig", ['drush']);
  gulp.watch("**/*.php", ['drush']);
  gulp.watch("**/*.yml", ['drush']);
  gulp.watch("**/*.theme", ['drush']);
});

// default task
gulp.task('default', ['serve']);
