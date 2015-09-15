var ts = require('typescript');

var createTypeScriptPreprocessor = function (args, config, logger, helper) {

    var log = logger.create('preprocessor.typescript');

    return function (content, file, done) {

        log.debug('Processing "%s".', file.originalPath);

        //TODO: pass those options from "outside"
        var compileResult = ts.transpile(content, {
            module: ts.ModuleKind.System,
            moduleName: 'foo',
            experimentalDecorators: true
        });

        //TODO: what happens if there is transpilation error?

        console.log(compileResult);

        done(compileResult);
    };
};

// PUBLISH DI MODULE
module.exports = {
    'preprocessor:TypeScript': ['factory', createTypeScriptPreprocessor]
};