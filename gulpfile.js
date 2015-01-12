var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del'); 

var paths = {
  scripts: 'src/coffeescripts/**/*.coffee',
  jade: 'src/jade/**/*.jade',
  images: 'src/img/**/*'
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/html'))
});

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['sass', 'templates', 'coffee', 'minify']);

gulp.task('default', function() {
  // place code for your default task here
});

