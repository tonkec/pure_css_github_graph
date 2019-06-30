const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

gulp.task("serve", ["scss"], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./scss/*.scss", ["scss"]).on("change", browserSync.reload);
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("scss", function() {
  return gulp
    .src("*.scss")
    .pipe(sass().on('error', function(err) {
        browserSync.notify(err.message, 5000);
        this.emit('end');
    }))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
