// -- Load Gulp and your plugins
var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    stylus     = require('gulp-stylus'),
    handlebars = require('gulp-compile-handlebars'),
    rename     = require('gulp-rename'),
    ghPages    = require('gulp-gh-pages'),
    plumber    = require('gulp-plumber'),
    yaml       = require('js-yaml'),
    fs         = require('fs');

// -- Settings
var paths = {
    dist:   './dist',
    src:    './src'
};

var watches = {
    stylus:     paths.src + '/stylus/**/*.styl',
    handlebars: paths.src + '/handlebars/**/*.hbs',
    datas:      paths.src + '/data/*.yml'
};

var files = {
    stylus:     paths.src + '/stylus/*.styl',
    handlebars: paths.src + '/handlebars/*.hbs'
};

// -- Connect task
gulp.task('connect', connect.server({
    root: paths.dist,
    port: 5000,
    livereload: true
}));

// -- Handlebars (HTML) task
gulp.task('handlebars', function () {
    var config   = yaml.safeLoad(fs.readFileSync('./src/data/config.yml', 'utf-8'));
    var speakers = yaml.safeLoad(fs.readFileSync('./src/data/speakers.yml', 'utf-8'));
    var schedule = yaml.safeLoad(fs.readFileSync('./src/data/schedule.yml', 'utf-8'));
    
    gulp.src(files.handlebars)
        .pipe(handlebars({
            config: config,
            speakers: speakers,
            schedule: schedule
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.dist))
        .pipe(connect.reload());
});

// -- Stylus (CSS) task
gulp.task('stylus', function () {
    gulp.src(files.stylus)
        .pipe(plumber())
        .pipe(stylus({
            use: ['nib'],
            set: ['compress']
        }))
        .pipe(gulp.dest(paths.dist + '/assets/css'))
        .pipe(connect.reload());
});

// -- Deploy to gh-pages task
gulp.task('deploy', function() {
  return gulp.src(paths.dist + '/**/*')
    .pipe(ghPages());
});

// -- Watch task
gulp.task('watch', function () {
    gulp.watch(watches.stylus, ['stylus']);
    gulp.watch([watches.handlebars, watches.datas], ['handlebars']);
});

// -- Set 'gulp server' for development
gulp.task('build',  ['handlebars', 'stylus']);
gulp.task('server', ['build', 'connect', 'watch']);
