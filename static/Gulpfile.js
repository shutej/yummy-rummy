var gulp       = require("gulp"),
    browserify = require("gulp-browserify"),
    concat     = require("gulp-concat"),
    imagemin   = require("gulp-imagemin"),
    sass       = require("gulp-sass"),
    watch      = require("gulp-watch"),
    connect    = require("gulp-connect");

var ROOT = __dirname + "/build"

gulp.task("styles", function () {
  return gulp.src("client/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("build/css/"));
});

gulp.task("scripts", function () {
  return gulp.src(["client/js/app.js"])
      .pipe(browserify({
          debug: true,
          transform: ["reactify"]
      }))
      .pipe(gulp.dest("build/js/"));
});

gulp.task("images", function () {
  return gulp.src(["client/img/**/*.png", "client/img/**/*.jpg", "client/img/**/*.gif"])
      .pipe(imagemin())
      .pipe(gulp.dest("build/img/"));
});

gulp.task("copy", function(){
  return gulp.src("client/*.html")
    .pipe(gulp.dest("build/"));
});

gulp.task("watch", function() {
  gulp.watch("client/js/**/*.js", ["scripts"]);
  gulp.watch("client/scss/**/*.scss", ["styles"]);
  gulp.watch("client/img/**/*", ["images"]);
  gulp.watch("client/*.html", ["copy"]);
});

gulp.task("serve", function() {
  connect.server({
    livereload: false,
    port: 8000,
    root: ["build"]
  });
});

gulp.task("build", ["styles", "scripts", "images", "copy"]);
gulp.task("default", ["build"]);
