var ts = require('typescript');
var path = require('path');

var createTypeScriptPreprocessor = function (args, config, logger) {

    var log = logger.create('preprocessor.typescript');
    var projectBasePath = path.resolve(__dirname, '../..'); //TODO: OS-specific, path specific

    return function (content, file, done) {

        var baseRelativePath = path.relative(projectBasePath, file.originalPath);
        baseRelativePath = path.join('base', baseRelativePath);

        log.debug('Processing "%s".', file.originalPath);

        //TODO: pass those options from "outside"
        var compilerOptions = {
            module: ts.ModuleKind.System,
            experimentalDecorators: true
        };

        var compileResult = ts.transpileModule(content, {
            compilerOptions: compilerOptions,
            moduleName: baseRelativePath.slice(0, -path.extname(baseRelativePath).length)
        });

        //TODO: what happens if there is transpilation error?
        done(compileResult.outputText); //keys: [ 'outputText', 'diagnostics', 'sourceMapText' ]
    };
};

// PUBLISH DI MODULE
module.exports = {
    'preprocessor:TypeScript': ['factory', createTypeScriptPreprocessor]
};

//TODO: source-map support