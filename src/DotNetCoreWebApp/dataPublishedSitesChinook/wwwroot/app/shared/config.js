System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appRoot, apiRoot, Config;
    return {
        setters: [],
        execute: function () {
            appRoot = thisApplication.rootPath + '/';
            apiRoot = appRoot + 'api/';
            exports_1("Config", Config = {
                pageActions: {
                    list: 0,
                    edit: 1,
                    delete: 2,
                    add: 3
                },
                apiUrls: {
                    artistsListing: apiRoot + 'artists',
                    findArtistById: apiRoot + 'artists/{id}'
                },
                entityFrameworkEntityState: {
                    Unchanged: 0,
                    Added: 1,
                    Modified: 2,
                    Deleted: 3
                }
            });
        }
    };
});
//# sourceMappingURL=config.js.map