System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that skips the first `count` items emitted by the source Observable.
     *
     * <img src="./img/skip.png" width="100%">
     *
     * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
     * @return {Observable} An Observable that skips values emitted by the source Observable.
     *
     * @method skip
     * @owner Observable
     */
    function skip(count) {
        return this.lift(new SkipOperator(count));
    }
    exports_1("skip", skip);
    var Subscriber_1, SkipOperator, SkipSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            SkipOperator = (function () {
                function SkipOperator(total) {
                    this.total = total;
                }
                SkipOperator.prototype.call = function (subscriber, source) {
                    return source.subscribe(new SkipSubscriber(subscriber, this.total));
                };
                return SkipOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SkipSubscriber = (function (_super) {
                __extends(SkipSubscriber, _super);
                function SkipSubscriber(destination, total) {
                    var _this = _super.call(this, destination) || this;
                    _this.total = total;
                    _this.count = 0;
                    return _this;
                }
                SkipSubscriber.prototype._next = function (x) {
                    if (++this.count > this.total) {
                        this.destination.next(x);
                    }
                };
                return SkipSubscriber;
            }(Subscriber_1.Subscriber));
        }
    };
});
//# sourceMappingURL=skip.js.map