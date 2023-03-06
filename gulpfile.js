import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

gulp.task("img", (done) =>{
    gulp.src('static/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('frontend/src/img'));
    done()
});
gulp.task("sass", (done) =>{
    gulp.src('static/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('frontend/src/css/'));
    done()
})

gulp.task('watch', () => {
    gulp.watch('static/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./static/img/**/*.{jpg,png,gif}', gulp.series('img'))
})