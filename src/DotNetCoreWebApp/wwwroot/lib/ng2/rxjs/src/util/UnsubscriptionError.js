System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var UnsubscriptionError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when one or more errors have occurred during the
             * `unsubscribe` of a {@link Subscription}.
             */
            UnsubscriptionError = (function (_super) {
                __extends(UnsubscriptionError, _super);
                function UnsubscriptionError(errors) {
                    var _this = _super.call(this) || this;
                    _this.errors = errors;
                    var err = Error.call(_this, errors ?
                        errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '');
                    _this.name = err.name = 'UnsubscriptionError';
                    _this.stack = err.stack;
                    _this.message = err.message;
                    return _this;
                }
                return UnsubscriptionError;
            }(Error));
            exports_1("UnsubscriptionError", UnsubscriptionError);
        }
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map