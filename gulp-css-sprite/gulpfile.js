var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
gulp.task('sprites', function() {
  return gulp.src('images/*.png')
         .pipe(spritesmith({
             imgName:'sprite.png',
             cssName:'css/sprite.css',
             padding:5
         }))
         .pipe(gulp.dest('dist/assets'))
});
gulp.task('default', function() {
    gulp.start('sprites');
});
