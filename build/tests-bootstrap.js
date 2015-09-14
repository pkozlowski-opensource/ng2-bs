// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

// Import all the specs, execute their `main()` method and kick off Karma (Jasmine).
Promise
    .all(Object.keys(window.__karma__.files) // All files served by Karma.
        .filter(onlySpecFiles)
        .map(function(path) {
            return System.import(path.slice(0, -3)); //TODO: hard-coded extension length
        }))
    .then(function() {
        __karma__.start();
    }, function(error) {
        __karma__.error(error.stack || error);
    });

function onlySpecFiles(path) {
    return /spec\.ts$/.test(path); //TODO: hard-coded extension
}
