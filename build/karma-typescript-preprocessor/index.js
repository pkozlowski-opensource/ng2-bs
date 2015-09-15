var ts = require('typescript');

var createTypeScriptPreprocessor = function (args, config, logger, helper) {

    var log = logger.create('preprocessor.typescript');

    return function (content, file, done) {

        log.debug('Processing "%s".', file.originalPath);

        //TODO: pass those options from "outside"
        var compilerOptions = {
            module: ts.ModuleKind.System,
            experimentalDecorators: true
        };

        var compileResult = ts.transpileModule(content, {
            compilerOptions: compilerOptions,
            moduleName: 'foo' //TODO: "calculate" module name
        });

        //TODO: what happens if there is transpilation error?
        done(compileResult.outputText); //keys: [ 'outputText', 'diagnostics', 'sourceMapText' ]
    };
};

// PUBLISH DI MODULE
module.exports = {
    'preprocessor:TypeScript': ['factory', createTypeScriptPreprocessor]
};