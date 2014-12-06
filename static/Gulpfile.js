var gulp       = require("gulp"),
    browserify = require("gulp-browserify"),
    imagemin   = require("gulp-imagemin"),
    sass       = require("gulp-sass"),
    uglify     = require("gulp-uglify"),
    watch      = require("gulp-watch"),
    connect    = require("gulp-connect"),
    exec       = require("child_process").exec;

var ROOT = __dirname + "/build"

gulp.task("styles", function () {
  return gulp.src("client/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("build/css/"));
});

gulp.task("scripts", function () {
  return gulp.src(["client/js/app.js"])
      .pipe(browserify({
          debug: false,
          transform: ["reactify"]
      }))
      .pipe(uglify())
      .pipe(gulp.dest("build/js/"));
});

gulp.task("images", function () {
  return gulp.src(["client/img/**/*.png", "client/img/**/*.jpg", "client/img/**/*.gif"])
      .pipe(imagemin())
      .pipe(gulp.dest("build/img/"));
});

gulp.task("copy", ["styles", "scripts", "images"], function() {
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

gulp.task("go-bindata", ["copy"], function(cb) {
  exec(
    "go-bindata -pkg=static -o=build.go -nomemcopy=true build/...",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

gulp.task("default", ["go-bindata"]);
