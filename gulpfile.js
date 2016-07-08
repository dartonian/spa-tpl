var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    revReplace = require("gulp-rev-replace"),
    RevAll = require('gulp-rev-all'),
    dest = require('gulp-dest'),
    useref = require('gulp-useref'),
    rename = require('gulp-rename'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    ts = require('gulp-typescript'),
    less = require('gulp-less'),
    flatten = require('gulp-flatten'),
    lessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new lessPluginCleanCSS({
        advanced: true,
        aggressiveMerging: false
    }),
    options = {
        landingDest: 'build/landings'
    };

//require('./gulpfile.ts');


gulp.task('default', ['replaceJs', 'replaceHtml', 'copy','landing'], function () {

});

//gulp.task('ts', function () {
//    var tsResult = gulp.src('app/js/**/*.ts')
//        .pipe(ts());
//
//    return tsResult.js
//        .pipe(gulp.dest('app/js/'));
//});

gulp.task('usemin', function () {
    return gulp.src('app.ts/src/index.html')
        .pipe(usemin({
            js1: [uglify(), rev()]
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    return gulp.src('app/less/styles.less')
        .pipe(less({
            plugins: [cleancss],
            relativeUrls: false,
            optimization: 2,
            cleancss: true,
            compress: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css'));
});

gulp.task('templates', ['usemin'], function () {
    return gulp.src('app/**/*.html')
        .pipe(rev())
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(''))
});

gulp.task('replaceHtml', ['templates'], function () {
    gulp
        .src(['build/index.html'])
        .pipe(revReplace({
            manifest: gulp.src('./rev-manifest.json')
        }))
        .pipe(gulp.dest('build/'));

    return gulp
        .src(['build/js/**/*.html'])
        .pipe(revReplace({
            manifest: gulp.src('./rev-manifest.json')
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('replaceJs', ['templates'], function () {
    return gulp
        .src(['build/js/*.js'])
        .pipe(revReplace({
            manifest: gulp.src('./rev-manifest.json')
        }))
        .pipe(gulp.dest('build/js/'))

});

gulp.task('copy', function () {
    gulp
        .src(['app/fonts/**/*.*'])
        .pipe(gulp.dest('build/css/fonts/'))

    gulp
        .src(['app/google*.html'])
        .pipe(gulp.dest('build/'))

    gulp
        .src(['app/robots/*.txt'])
        .pipe(gulp.dest('build/robots/'))

    gulp
        .src(['app/css/fonts/**/*.*'])
        .pipe(gulp.dest('build/css/fonts/'))

    gulp
        .src(['app/bower_components/font-awesome/fonts/**/*.*'])
        .pipe(gulp.dest('build/fonts/'))

    gulp
        .src(['app/images/**/*.*'])
        .pipe(gulp.dest('build/images/'))
    gulp
        .src(['app/img/**/*.*'])
        .pipe(gulp.dest('build/img/'))
    gulp.src(['app/*.pdf'])
        .pipe(gulp.dest('build/'))
});

gulp.task('landing', ['landing:html', 'landing:copy']);
gulp.task('landing:html', ['landing:less'], function () {
    var revAll = new RevAll({
        dontRenameFile: ['.html']
    });

    gulp
        .src('landing/**/*.html')

        .pipe(useref({}))
        .pipe(revAll.revision())
        .pipe(gulpif('*.css', autoprefixer()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.html', rename(function (path) {
            path.basename = path.dirname;
            path.dirname = '';
        }), flatten({ includeParents: -2})))
        //.pipe(minifyHtml())

        .pipe(gulp.dest(options.landingDest));
});
gulp.task('landing:copy', function(){
    gulp.src('landing/**/images/**/*.*')
        .pipe(gulp.dest(options.landingDest));

    gulp.src('landing/**/fonts/**/*.*')
        .pipe(gulp.dest(options.landingDest));
});

gulp.task('landing:less', function () {
    return gulp.src('landing/**/less/styles.less')
        .pipe(less({
            plugins: [cleancss],
            //relativeUrls: false,
            optimization: 2,
            cleancss: true,
            compress: true
        }))
        .pipe(rename(function(p){
            p.dirname = p.dirname.replace('less', 'css');
        }))
        .pipe(gulp.dest('./landing'));
});