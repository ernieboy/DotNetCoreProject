System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArrayLike;
    return {
        setters: [],
        execute: function () {
            exports_1("isArrayLike", isArrayLike = (function (x) { return x && typeof x.length === 'number'; }));
        }
    };
});
//# sourceMappingURL=isArrayLike.js.map