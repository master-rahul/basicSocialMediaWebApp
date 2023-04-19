const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const md5 = require('gulp-md5-assets');
const rev = require('gulp-rev-change');
const uglify = require('gulp-uglify-es').default;
const squoosh = require('gulp-libsquoosh');
const fs_extra = require('fs-extra');
const rename = require('gulp-rename');

gulp.task('css',  function() {
    console.log('minifying css');
    return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('csst', function () {
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true // merge with the existing manifest if one exists
    }))
    .pipe(gulp.dest('./public/assets'));

 
})

gulp.task('js', function () {
    return gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true // merge with the existing manifest if one exists
    }))
    .pipe(gulp.dest('./public/assets'));
   
})  

gulp.task('images', function () {
    return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(squoosh())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
})

//empty the public assets directory

gulp.task('clean:assets', function () {
    fs_extra.remove('./public/assets/*.*', (error)=>{
        if(error) console.log('error in deleting', error);
    });
    fs_extra.remove('./public/rev-manifest.json', (error) => {
        if (error) console.log('error in deleting', error);
    });
  
})



gulp.task('all', function () {
    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(cssnano())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./public/assets'));   
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg|js)')
        .pipe(squoosh())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
   
})

// gulp.task('all', function () {
//     return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg|js|css)')
//         .pipe(squoosh())
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets'))
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true
//         }))
//         .pipe(gulp.dest('./public/assets'))
//         .pipe(gulp.dest('./public/assets'));
// })

gulp.task('build', gulp.series('clean:assets','csst','js','images'), function (done) {
    console.log("Building Assets");
    done();
})