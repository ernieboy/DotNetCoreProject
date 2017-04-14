System.register(["../Subscriber", "../util/noop"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    /**
     * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
     *
     * <img src="./img/ignoreElements.png" width="100%">
     *
     * @return {Observable} an empty Observable that only calls `complete`
     * or `error`, based on which one is called by the source Observable.
     * @method ignoreElements
     * @owner Observable
     */
    function ignoreElements() {
        return this.lift(new IgnoreElementsOperator());
    }
    exports_1("ignoreElements", ignoreElements);
    var Subscriber_1, noop_1, IgnoreElementsOperator, IgnoreElementsSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (noop_1_1) {
                noop_1 = noop_1_1;
            }
        ],
        execute: function () {
            ;
            IgnoreElementsOperator = (function () {
                function IgnoreElementsOperator() {
                }
                IgnoreElementsOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new IgnoreElementsSubscriber(subscriber));
                };
                return IgnoreElementsOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            IgnoreElementsSubscriber = (function (_super) {
                __extends(IgnoreElementsSubscriber, _super);
                function IgnoreElementsSubscriber() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                IgnoreElementsSubscriber.prototype._next = function (unused) {
                    noop_1.noop();
                };
                return IgnoreElementsSubscriber;
            }(Subscriber_1.Subscriber));
        }
    };
});
//# sourceMappingURL=ignoreElements.js.map