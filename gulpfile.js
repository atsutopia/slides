const gulp = require('gulp');
const webpackStream = require('webpack-stream');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');

const DEST = './static';

gulp.task('pug', () => {
  return gulp.src(`src/pug/**/[!_]*.pug`)
    .pipe(pug({
      pretty: true,
      basedir: `src/pug`
    }))
    .pipe(gulp.dest(`${DEST}`));
});

gulp.task('javascript', function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(DEST));
});

gulp.task('browser-sync', function() {
  browserSync({
      server: {
        baseDir: DEST,
      },
      ghostMode: false,
      open: false,
  });

  gulp.watch('./src/pug/**/*.pug', ['pug', 'reload']);
  gulp.watch('./src/js/**/*.js', ['javascript', 'reload']);
  gulp.watch('./src/scss/**/*.scss', ['javascript', 'reload']);
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('build', ['javascript', 'pug']);
gulp.task('default', ['build', 'browser-sync']);
