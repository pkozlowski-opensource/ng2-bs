var gulp = require('gulp');

var PATHS = {
    src: {
        js: 'src/**/*.ts',
        test: 'test/**/*.spec.ts',
        html: 'src/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/systemjs/dist/system-csp-production.js'
    ],
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src([PATHS.src.js, PATHS.typings])
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

gulp.task('libs', function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('test', function (done) {
    var Server = require('karma').Server;
    new Server({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            PATHS.lib[0], PATHS.lib[1], PATHS.lib[2], //TODO: better
            //TODO: System.register config
            PATHS.src.js,
            PATHS.src.test
        ],
        preprocessors: {
            '**/*.ts': ['TypeScript']
        },
        plugins: ['karma-jasmine', 'karma-chrome-launcher', require('./build/karma-typescript-preprocessor')],
        singleRun: true
    }, done).start();
});

gulp.task('play', ['libs', 'html', 'js'], function () {
    var httpPlay = require('http-play');

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    httpPlay({dist: __dirname + '/dist', port: 9000});
});
