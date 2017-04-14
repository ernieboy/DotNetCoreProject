System.register(["../observable/ConnectableObservable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits the results of invoking a specified selector on items
     * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
     *
     * <img src="./img/multicast.png" width="100%">
     *
     * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
     * which the source sequence's elements will be multicast to the selector function
     * or Subject to push source elements into.
     * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
     * as many times as needed, without causing multiple subscriptions to the source stream.
     * Subscribers to the given source will receive all notifications of the source from the
     * time of the subscription forward.
     * @return {Observable} An Observable that emits the results of invoking the selector
     * on the items emitted by a `ConnectableObservable` that shares a single subscription to
     * the underlying stream.
     * @method multicast
     * @owner Observable
     */
    function multicast(subjectOrSubjectFactory, selector) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return this.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
        connectable.source = this;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    }
    exports_1("multicast", multicast);
    var ConnectableObservable_1, MulticastOperator;
    return {
        setters: [
            function (ConnectableObservable_1_1) {
                ConnectableObservable_1 = ConnectableObservable_1_1;
            }
        ],
        execute: function () {
            MulticastOperator = (function () {
                function MulticastOperator(subjectFactory, selector) {
                    this.subjectFactory = subjectFactory;
                    this.selector = selector;
                }
                MulticastOperator.prototype.call = function (subscriber, source) {
                    var selector = this.selector;
                    var subject = this.subjectFactory();
                    var subscription = selector(subject).subscribe(subscriber);
                    subscription.add(source.subscribe(subject));
                    return subscription;
                };
                return MulticastOperator;
            }());
            exports_1("MulticastOperator", MulticastOperator);
        }
    };
});
//# sourceMappingURL=multicast.js.map