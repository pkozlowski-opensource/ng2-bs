var gulp = require('gulp');

var PATHS = {
    src: {
        js: 'src/**/*.ts',
        html: 'src/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/systemjs/dist/system-csp-production.js'
    ]
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ng2', function () {
    var download = require('gulp-download');
    var ng2Version = require('./package.json').dependencies.angular2;
    return download('https://code.angularjs.org/' + ng2Version + '/angular2.js').pipe(gulp.dest('dist/lib'));
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src(PATHS.src.js)
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', ['ng2'], function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('play', ['libs', 'html', 'js'], function () {
    var httpPlay = require('http-play');

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    httpPlay({dist: __dirname + '/dist', port: 9000});
});

