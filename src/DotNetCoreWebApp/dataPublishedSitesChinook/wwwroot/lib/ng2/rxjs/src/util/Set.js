System.register(["./root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function minimalSetImpl() {
        // THIS IS NOT a full impl of Set, this is just the minimum
        // bits of functionality we need for this library.
        return (function () {
            function MinimalSet() {
                this._values = [];
            }
            MinimalSet.prototype.add = function (value) {
                if (!this.has(value)) {
                    this._values.push(value);
                }
            };
            MinimalSet.prototype.has = function (value) {
                return this._values.indexOf(value) !== -1;
            };
            Object.defineProperty(MinimalSet.prototype, "size", {
                get: function () {
                    return this._values.length;
                },
                enumerable: true,
                configurable: true
            });
            MinimalSet.prototype.clear = function () {
                this._values.length = 0;
            };
            return MinimalSet;
        }());
    }
    exports_1("minimalSetImpl", minimalSetImpl);
    var root_1, Set;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            exports_1("Set", Set = root_1.root.Set || minimalSetImpl());
        }
    };
});
//# sourceMappingURL=Set.js.map