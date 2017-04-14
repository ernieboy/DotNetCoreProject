System.register(["../Subject", "../scheduler/async", "../Subscriber", "../util/isNumeric", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    function windowTime(windowTimeSpan) {
        var scheduler = async_1.async;
        var windowCreationInterval = null;
        var maxWindowSize = Number.POSITIVE_INFINITY;
        if (isScheduler_1.isScheduler(arguments[3])) {
            scheduler = arguments[3];
        }
        if (isScheduler_1.isScheduler(arguments[2])) {
            scheduler = arguments[2];
        }
        else if (isNumeric_1.isNumeric(arguments[2])) {
            maxWindowSize = arguments[2];
        }
        if (isScheduler_1.isScheduler(arguments[1])) {
            scheduler = arguments[1];
        }
        else if (isNumeric_1.isNumeric(arguments[1])) {
            windowCreationInterval = arguments[1];
        }
        return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
    }
    exports_1("windowTime", windowTime);
    function dispatchWindowTimeSpanOnly(state) {
        var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
        if (window) {
            subscriber.closeWindow(window);
        }
        state.window = subscriber.openWindow();
        this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
        var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
        var window = subscriber.openWindow();
        var action = this;
        var context = { action: action, subscription: null };
        var timeSpanState = { subscriber: subscriber, window: window, context: context };
        context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
        action.add(context.subscription);
        action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(state) {
        var subscriber = state.subscriber, window = state.window, context = state.context;
        if (context && context.action && context.subscription) {
            context.action.remove(context.subscription);
        }
        subscriber.closeWindow(window);
    }
    var Subject_1, async_1, Subscriber_1, isNumeric_1, isScheduler_1, WindowTimeOperator, CountedSubject, WindowTimeSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (isNumeric_1_1) {
                isNumeric_1 = isNumeric_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
            WindowTimeOperator = (function () {
                function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
                    this.windowTimeSpan = windowTimeSpan;
                    this.windowCreationInterval = windowCreationInterval;
                    this.maxWindowSize = maxWindowSize;
                    this.scheduler = scheduler;
                }
                WindowTimeOperator.prototype.call = function (subscriber, source) {
                    return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
                };
                return WindowTimeOperator;
            }());
            CountedSubject = (function (_super) {
                __extends(CountedSubject, _super);
                function CountedSubject() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._numberOfNextedValues = 0;
                    return _this;
                }
                CountedSubject.prototype.next = function (value) {
                    this._numberOfNextedValues++;
                    _super.prototype.next.call(this, value);
                };
                Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
                    get: function () {
                        return this._numberOfNextedValues;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CountedSubject;
            }(Subject_1.Subject));
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            WindowTimeSubscriber = (function (_super) {
                __extends(WindowTimeSubscriber, _super);
                function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
                    var _this = _super.call(this, destination) || this;
                    _this.destination = destination;
                    _this.windowTimeSpan = windowTimeSpan;
                    _this.windowCreationInterval = windowCreationInterval;
                    _this.maxWindowSize = maxWindowSize;
                    _this.scheduler = scheduler;
                    _this.windows = [];
                    var window = _this.openWindow();
                    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
                        var closeState = { subscriber: _this, window: window, context: null };
                        var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
                        _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
                        _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
                    }
                    else {
                        var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
                        _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
                    }
                    return _this;
                }
                WindowTimeSubscriber.prototype._next = function (value) {
                    var windows = this.windows;
                    var len = windows.length;
                    for (var i = 0; i < len; i++) {
                        var window_1 = windows[i];
                        if (!window_1.closed) {
                            window_1.next(value);
                            if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                                this.closeWindow(window_1);
                            }
                        }
                    }
                };
                WindowTimeSubscriber.prototype._error = function (err) {
                    var windows = this.windows;
                    while (windows.length > 0) {
                        windows.shift().error(err);
                    }
                    this.destination.error(err);
                };
                WindowTimeSubscriber.prototype._complete = function () {
                    var windows = this.windows;
                    while (windows.length > 0) {
                        var window_2 = windows.shift();
                        if (!window_2.closed) {
                            window_2.complete();
                        }
                    }
                    this.destination.complete();
                };
                WindowTimeSubscriber.prototype.openWindow = function () {
                    var window = new CountedSubject();
                    this.windows.push(window);
                    var destination = this.destination;
                    destination.next(window);
                    return window;
                };
                WindowTimeSubscriber.prototype.closeWindow = function (window) {
                    window.complete();
                    var windows = this.windows;
                    windows.splice(windows.indexOf(window), 1);
                };
                return WindowTimeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    };
});
//# sourceMappingURL=windowTime.js.map