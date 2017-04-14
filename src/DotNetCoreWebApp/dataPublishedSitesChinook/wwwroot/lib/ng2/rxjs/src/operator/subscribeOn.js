System.register(["../observable/SubscribeOnObservable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
     *
     * <img src="./img/subscribeOn.png" width="100%">
     *
     * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
     * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
     .
     * @method subscribeOn
     * @owner Observable
     */
    function subscribeOn(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        return this.lift(new SubscribeOnOperator(scheduler, delay));
    }
    exports_1("subscribeOn", subscribeOn);
    var SubscribeOnObservable_1, SubscribeOnOperator;
    return {
        setters: [
            function (SubscribeOnObservable_1_1) {
                SubscribeOnObservable_1 = SubscribeOnObservable_1_1;
            }
        ],
        execute: function () {
            SubscribeOnOperator = (function () {
                function SubscribeOnOperator(scheduler, delay) {
                    this.scheduler = scheduler;
                    this.delay = delay;
                }
                SubscribeOnOperator.prototype.call = function (subscriber, source) {
                    return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
                };
                return SubscribeOnOperator;
            }());
        }
    };
});
//# sourceMappingURL=subscribeOn.js.map