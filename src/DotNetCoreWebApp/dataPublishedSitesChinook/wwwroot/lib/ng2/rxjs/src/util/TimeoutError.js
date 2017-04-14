System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var TimeoutError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when duetime elapses.
             *
             * @see {@link timeout}
             *
             * @class TimeoutError
             */
            TimeoutError = (function (_super) {
                __extends(TimeoutError, _super);
                function TimeoutError() {
                    var _this = this;
                    var err = _this = _super.call(this, 'Timeout has occurred') || this;
                    _this.name = err.name = 'TimeoutError';
                    _this.stack = err.stack;
                    _this.message = err.message;
                    return _this;
                }
                return TimeoutError;
            }(Error));
            exports_1("TimeoutError", TimeoutError);
        }
    };
});
//# sourceMappingURL=TimeoutError.js.map