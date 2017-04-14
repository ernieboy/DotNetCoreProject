System.register(["../Subscriber", "../util/EmptyError"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that emits only the last item emitted by the source Observable.
     * It optionally takes a predicate function as a parameter, in which case, rather than emitting
     * the last item from the source Observable, the resulting Observable will emit the last item
     * from the source Observable that satisfies the predicate.
     *
     * <img src="./img/last.png" width="100%">
     *
     * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
     * callback if the Observable completes before any `next` notification was sent.
     * @param {function} predicate - the condition any source emitted item has to satisfy.
     * @return {Observable} an Observable that emits only the last item satisfying the given condition
     * from the source, or an NoSuchElementException if no such items are emitted.
     * @throws - Throws if no items that match the predicate are emitted by the source Observable.
     * @method last
     * @owner Observable
     */
    function last(predicate, resultSelector, defaultValue) {
        return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
    }
    exports_1("last", last);
    var Subscriber_1, EmptyError_1, LastOperator, LastSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyError_1_1) {
                EmptyError_1 = EmptyError_1_1;
            }
        ],
        execute: function () {
            LastOperator = (function () {
                function LastOperator(predicate, resultSelector, defaultValue, source) {
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                }
                LastOperator.prototype.call = function (observer, source) {
                    return source._subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
                };
                return LastOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            LastSubscriber = (function (_super) {
                __extends(LastSubscriber, _super);
                function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
                    var _this = _super.call(this, destination) || this;
                    _this.predicate = predicate;
                    _this.resultSelector = resultSelector;
                    _this.defaultValue = defaultValue;
                    _this.source = source;
                    _this.hasValue = false;
                    _this.index = 0;
                    if (typeof defaultValue !== 'undefined') {
                        _this.lastValue = defaultValue;
                        _this.hasValue = true;
                    }
                    return _this;
                }
                LastSubscriber.prototype._next = function (value) {
                    var index = this.index++;
                    if (this.predicate) {
                        this._tryPredicate(value, index);
                    }
                    else {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                };
                LastSubscriber.prototype._tryPredicate = function (value, index) {
                    var result;
                    try {
                        result = this.predicate(value, index, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (result) {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                };
                LastSubscriber.prototype._tryResultSelector = function (value, index) {
                    var result;
                    try {
                        result = this.resultSelector(value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.lastValue = result;
                    this.hasValue = true;
                };
                LastSubscriber.prototype._complete = function () {
                    var destination = this.destination;
                    if (this.hasValue) {
                        destination.next(this.lastValue);
                        destination.complete();
                    }
                    else {
                        destination.error(new EmptyError_1.EmptyError);
                    }
                };
                return LastSubscriber;
            }(Subscriber_1.Subscriber));
        }
    };
});
//# sourceMappingURL=last.js.map