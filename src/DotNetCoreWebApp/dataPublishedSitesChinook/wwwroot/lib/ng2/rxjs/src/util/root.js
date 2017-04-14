System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root;
    return {
        setters: [],
        execute: function () {
            /**
             * window: browser in DOM main thread
             * self: browser in WebWorker
             * global: Node.js/other
             */
            exports_1("root", root = (typeof window == 'object' && window.window === window && window
                || typeof self == 'object' && self.self === self && self
                || typeof global == 'object' && global.global === global && global));
            if (!root) {
                throw new Error('RxJS could not find any global context (window, self, global)');
            }
        }
    };
});
//# sourceMappingURL=root.js.map