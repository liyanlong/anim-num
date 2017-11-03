const gulp = require('gulp')
const jsdoc = require('gulp-jsdoc3')


// We do this over using include/exclude to make everything feel gulp-like!
gulp.task('docs', function (cb) {
  let config = require('./config/jsdoc.json');
  gulp.src(['./docs.md', './src/**/*.js'], {read: false})
      .pipe(jsdoc(config, cb));
});

gulp.task('watch', function(){
  gulp.watch(['./docs.md', './src/**/*.js'], ['docs']);
});

gulp.task('default', ['docs'])
