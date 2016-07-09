var gulp = require('gulp');
var base64 = require('gulp-base64');

gulp.task('base',function(){
    return gulp.src('css/test.css')
           .pipe(base64({
               extensions: ['svg', 'png', /\.jpg#datauri$/i],
               maxImageSize: 20*1024, // bytes
               debug: true
           }))
           .pipe(gulp.dest('dist/css'));
});
gulp.task('default', function() {
    gulp.start('base');
});
