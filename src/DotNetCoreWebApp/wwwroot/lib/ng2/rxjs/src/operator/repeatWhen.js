System.register(["../Subject", "../util/tryCatch", "../util/errorObject", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
     * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
     * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
     * this method will resubscribe to the source Observable.
     *
     * <img src="./img/repeatWhen.png" width="100%">
     *
     * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
     * which a user can `complete` or `error`, aborting the repetition.
     * @return {Observable} The source Observable modified with repeat logic.
     * @method repeatWhen
     * @owner Observable
     */
    function repeatWhen(notifier) {
        return this.lift(new RepeatWhenOperator(notifier));
    }
    exports_1("repeatWhen", repeatWhen);
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1, RepeatWhenOperator, RepeatWhenSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            RepeatWhenOperator = (function () {
                function RepeatWhenOperator(notifier) {
                    this.notifier = notifier;
                }
                RepeatWhenOperator.prototype.call = function (subscriber, source) {
                    return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
                };
                return RepeatWhenOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RepeatWhenSubscriber = (function (_super) {
                __extends(RepeatWhenSubscriber, _super);
                function RepeatWhenSubscriber(destination, notifier, source) {
                    var _this = _super.call(this, destination) || this;
                    _this.notifier = notifier;
                    _this.source = source;
                    _this.sourceIsBeingSubscribedTo = true;
                    return _this;
                }
                RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.sourceIsBeingSubscribedTo = true;
                    this.source.subscribe(this);
                };
                RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
                    if (this.sourceIsBeingSubscribedTo === false) {
                        return _super.prototype.complete.call(this);
                    }
                };
                RepeatWhenSubscriber.prototype.complete = function () {
                    this.sourceIsBeingSubscribedTo = false;
                    if (!this.isStopped) {
                        if (!this.retries) {
                            this.subscribeToRetries();
                        }
                        else if (this.retriesSubscription.closed) {
                            return _super.prototype.complete.call(this);
                        }
                        this._unsubscribeAndRecycle();
                        this.notifications.next();
                    }
                };
                RepeatWhenSubscriber.prototype._unsubscribe = function () {
                    var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
                    if (notifications) {
                        notifications.unsubscribe();
                        this.notifications = null;
                    }
                    if (retriesSubscription) {
                        retriesSubscription.unsubscribe();
                        this.retriesSubscription = null;
                    }
                    this.retries = null;
                };
                RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
                    var _a = this, notifications = _a.notifications, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
                    this.notifications = null;
                    this.retries = null;
                    this.retriesSubscription = null;
                    _super.prototype._unsubscribeAndRecycle.call(this);
                    this.notifications = notifications;
                    this.retries = retries;
                    this.retriesSubscription = retriesSubscription;
                    return this;
                };
                RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
                    this.notifications = new Subject_1.Subject();
                    var retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
                    if (retries === errorObject_1.errorObject) {
                        return _super.prototype.complete.call(this);
                    }
                    this.retries = retries;
                    this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
                };
                return RepeatWhenSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    };
});
//# sourceMappingURL=repeatWhen.js.map