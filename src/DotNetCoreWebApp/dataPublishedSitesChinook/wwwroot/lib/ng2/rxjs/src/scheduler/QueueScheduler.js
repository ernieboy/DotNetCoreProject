System.register(["./AsyncScheduler"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var AsyncScheduler_1, QueueScheduler;
    return {
        setters: [
            function (AsyncScheduler_1_1) {
                AsyncScheduler_1 = AsyncScheduler_1_1;
            }
        ],
        execute: function () {
            QueueScheduler = (function (_super) {
                __extends(QueueScheduler, _super);
                function QueueScheduler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueueScheduler;
            }(AsyncScheduler_1.AsyncScheduler));
            exports_1("QueueScheduler", QueueScheduler);
        }
    };
});
//# sourceMappingURL=QueueScheduler.js.map