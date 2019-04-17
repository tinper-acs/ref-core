// dependency

var colors = require("colors/safe");
// var util = require("./util");
var path = require("path");
var shelljs = require("shelljs");

// gulp & gulp plugin
var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var es3ify = require("gulp-es3ify");
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
var getFromCwd =  function() {
  var args = [].slice.call(arguments, 0);
  args.unshift(process.cwd());
  return path.join.apply(path, args);
};

gulp.task("pack_lib", function(cb) {
  console.log(colors.info("###### pack_lib start ######"));
  gulp
    .src([
      path.join(process.cwd(), "./js/**/*.js"),
      path.join(process.cwd(), "./js/**/*.jsx")
    ])
    .pipe(
      babel({
        presets: ["react", "es2015-ie", "stage-1"].map(function(item) {
          return require.resolve("babel-preset-" + item);
        }),
        plugins: [
          "transform-object-assign",
          "add-module-exports",
          "transform-object-entries",
          "transform-object-rest-spread"
        ].map(function(item) {
          return require.resolve("babel-plugin-" + item);
        })
      })
    )
    .pipe(es3ify())
    .pipe(gulp.dest("lib/"))
    .on("end", function() {
      console.log(colors.info("###### pack_lib done ######"));
      cb();
    });
});

// gulp.task("sass_component", function() {
//   gulp
//     .src([path.join(process.cwd(), "./src/**/*.scss")])
//     .pipe(sass())
//     .pipe(gulp.dest("./lib"));
//   console.log("###### sass_component done ######");
// });
// gulp.task("css_component", function() {
//   gulp
//     .src([path.join(process.cwd(), "./css/*.css")])
//     .pipe(gulp.dest("./lib/css"));
//   console.log("###### css_component done ######");
// });

gulp.task("clean_lib", function() {
  return shelljs.rm("-rf", getFromCwd("lib"));
});

gulp.task("lib", ["clean_lib","pack_lib"], function() {});

gulp.task('default',['lib']);