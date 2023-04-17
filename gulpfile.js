const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const md5 = require('gulp-md5-assets');
const rev = require('gulp-rev-change');
const uglify = require('gulp-uglify-es').default;
const squoosh = require('gulp-libsquoosh');
const fs_extra = require('fs-extra');

gulp.task('css',  async (done) => {
    console.log('minifying css');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));
   
   done();

});

gulp.task('csst', (done) => {
    gulp.src('./assets/css/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true // merge with the existing manifest if one exists
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
})

gulp.task('js', function (done) {
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true // merge with the existing manifest if one exists
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})  

gulp.task('images', function (done) {
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(squoosh())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: 'true'
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

//empty the public assets directory

gulp.task('clean:assets', function (done) {
    fs_extra.remove('./public/assets', (error)=>{
        if(error) console.log('error in deleting', error);
    });
    done();
})

gulp.task('build', gulp.series('clean:assets','css','csst','js','images'), function (done) {
    console.log("Building Assets");
    done();
})