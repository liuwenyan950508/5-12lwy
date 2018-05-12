var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var css = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var revCollector = require('gulp-rev-collector');
gulp.task('scss', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(css())
        .pipe(gulp.dest('build/css'))
})
var options = {
    collapseWhitespace: true
}
var data = require('./src/data.json');
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('build'))
})
gulp.task('uglify', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});
gulp.task('watch', ['scss', 'html', 'uglify'], function() {
    gulp.watch('src/css/*.scss', ['scss']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/*.js', ['uglify']);
});
gulp.task('server', ['watch'], function() {
    gulp.src('src')
        .pipe(webserver({
            'port': 9090,
            'open': true,
            'livereload': true,
            middleware: function(req, res, next) {
                if (req.url === '/api/data') {
                    res.end(JSON.stringify(data));
                }
                next();
            }
        }))

})
gulp.task('default', ['server'])