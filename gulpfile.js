var gulp = require('gulp');
var sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync= require('browser-sync').create();
var reload = browserSync.reload
let cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps');


gulp.task('printName', function() {
    console.log('My name is joe');
})

gulp.task('printAge', function() {
    console.log('My age is 33');
})

gulp.task('default2', ['printAge', 'printName'])

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())

})

gulp.task('autoprefixerdefault', () => 
    gulp.src('src/app.css')
    .pipe(autoprefixer({
        cascade:false
    }))
    .pipe(gulp.dest('dist'))
)
 
gulp.task('default',  ['sass:minify', 'browser-sync'],function() {
    gulp.watch('./src/scss/**/*', ['sass'])
})

exports.autoprefixertask = () => (
    gulp.src('public/css/main.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('sass:minify', function() {
    return gulp.src('./public/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
})


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
            notify: false,
            open: true
        }
    });
    gulp.watch('./public/*.html').on('change', browserSync.reload);
});


gulp.task('production', ['sass:minify'])


gulp.task('webpack', function() {
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'webpack'
    ]))
    .pipe(br)
})

