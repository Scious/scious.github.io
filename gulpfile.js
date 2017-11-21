
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var input = './assets/sass/**/*.scss';
var output = './assets/css';
var entryFile = 'dev-server.js';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
    return gulp
        .src(input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    return gulp
        .watch(input, ['sass'])
        .on('change', function(event) {
            // livereload.reload()
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('prod', function() {
    return gulp
        .src(input)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});


gulp.task('server',function(){  
    nodemon({
        'script': entryFile,
        'ignore': ['*.test.js', '*.css', '*.scss', 'node_modules/*'],
        'watch': './',
        'env': {
            'NODE_ENV': 'development',
            'DEBUG': 'LOG'
        }
    })
    .on('restart', function () {
        setTimeout(function(){
          livereload.changed(entryFile);
          // gulp.src('index.js').pipe(notify('Reloading page, please wait...'));
        }, 1000); // 1 second pause
      });
});


gulp.task('default', ['server', 'sass', 'watch' /*, possible other tasks... */ ]);
