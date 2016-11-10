var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
//    pug = require('gulp-pug'),
	babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer');
    
//gulp.task('pug', function() {
//    return gulp.src('app/pug/**/*.pug')
//        .pipe(pug({
//            pretty: true
//        })) 
//        .pipe(gulp.dest('app/'));
//});
gulp.task('js', function() {
  return gulp.src('app/js/es6/*.js')               // #1. select all js files in the app folder
                          // #2. print each file in the stream
      .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
      .pipe(gulp.dest('app/js'));               // #4. copy the results to the build folder
});
gulp.task('sass', function() {
    return gulp.src('app/sass/main.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions','>1%','ie 8','ie 7'],{cascade:true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}))
});
gulp.task('scripts',function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});
gulp.task('css-libs', function(){
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/css'));
});
gulp.task('clean',function(){
    return del.sync('dist');
});
gulp.task('clear',function(){
    return cache.clearAll();
});
gulp.task('browser-sync',function(){
    browserSync({
        server:{
            baseDir:'app'
        },
        notify:false
    });
});
gulp.task('img',function(){
   return gulp.src('app/img/**/*')
   .pipe(cache(imagemin({
       interlaced:true,
       progressive:true,
       svgoPlugins:[{removeViewBox:false}],
        use:[pngquant()]
         
   })))
    .pipe(gulp.dest('dist/img'));
});
gulp.task('watch',['browser-sync','css-libs','sass','scripts','js'],function(){
    gulp.watch('app/sass/**/*.scss',['sass']);
    gulp.watch('app/pug/*.pug',['pug']);
	gulp.watch('app/js/**/*.js',['js']);
    gulp.watch('app/**/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);
});

gulp.task('build',['clean','img','sass','scripts'],function(){
    var buildCss=gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css',
    ])
    .pipe(gulp.dest('dist/css'));
    
    var buildFonts=gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
    
    var buildsJs=gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));
    
    var buildHtml=gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
})