var gulp = require('gulp');
var connect = require('gulp-connect');
var fs = require('fs');
var ejs = require('gulp-ejs');
var md5 = require('md5');
var version = md5(new Date().getTime());

gulp.task('copy', function() {
    gulp.src('./src/*.!html')
        .pipe(gulp.dest('./dest/'))
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
   gulp.src('./src/*.html')
       .pipe(ejs({
           version: version
       }))
       .pipe(gulp.dest('./dest/'))
       // 导入ejs模板后再pipe到dest目录下,若copy task下也存在pipe html文件到dest目录,则可能覆盖此次pipe,因此copy task不要包括html文件
       .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/*'], ['copy']);
    gulp.watch(['./src/*.html', './src/*.ejs'], ['html']);
});

gulp.task('default', ['readVersion'], function () {
    gulp.start(['html', 'copy', 'connect', 'watch']);
});
