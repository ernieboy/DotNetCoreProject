System.register(["../util/root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, Symbol, rxSubscriber, $$rxSubscriber;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            Symbol = root_1.root.Symbol;
            exports_1("rxSubscriber", rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
                Symbol.for('rxSubscriber') : '@@rxSubscriber');
            /**
             * @deprecated use rxSubscriber instead
             */
            exports_1("$$rxSubscriber", $$rxSubscriber = rxSubscriber);
        }
    };
});
//# sourceMappingURL=rxSubscriber.js.map