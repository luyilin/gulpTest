var gulp = require('gulp');
var connect = require('gulp-connect');
var fs = require('fs');
var ejs = require('gulp-ejs');
var md5 = require('md5');
var version = md5(new Date().getTime());
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');

gulp.task('copy', function() {
    gulp.src('./src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('./dest/js/'))
        .pipe(connect.reload());
    gulp.src('./src/css/*')
        // .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dest/css/'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
   connect.server({
       root: './dest',
       port: 8080,
       livereload: true
   })
});

gulp.task('readVersion', function () {
   version = fs.readFileSync('version','utf-8');
});

gulp.task('html', function () {
   gulp.src('./src/tpl/*')
       .pipe(ejs({
           version: version
       }))
       .pipe(gulp.dest('./dest/tpl'))
       // 导入ejs模板后再pipe到dest目录下,若copy task下也存在pipe html文件到dest目录,则可能覆盖此次pipe,因此copy task里不要包括html文件
       .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/js/*', './src/css/*'], ['copy']);
    gulp.watch(['./src/tpl/*', './src/ejs/*'], ['html']);
});

gulp.task('default', ['readVersion'], function () {
    gulp.start(['html', 'copy', 'connect', 'watch']);
});
