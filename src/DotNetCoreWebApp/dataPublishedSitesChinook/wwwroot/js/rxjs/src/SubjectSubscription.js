System.register(["./Subscription"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var Subscription_1, SubjectSubscription;
    return {
        setters: [
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SubjectSubscription = (function (_super) {
                __extends(SubjectSubscription, _super);
                function SubjectSubscription(subject, subscriber) {
                    var _this = _super.call(this) || this;
                    _this.subject = subject;
                    _this.subscriber = subscriber;
                    _this.closed = false;
                    return _this;
                }
                SubjectSubscription.prototype.unsubscribe = function () {
                    if (this.closed) {
                        return;
                    }
                    this.closed = true;
                    var subject = this.subject;
                    var observers = subject.observers;
                    this.subject = null;
                    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                        return;
                    }
                    var subscriberIndex = observers.indexOf(this.subscriber);
                    if (subscriberIndex !== -1) {
                        observers.splice(subscriberIndex, 1);
                    }
                };
                return SubjectSubscription;
            }(Subscription_1.Subscription));
            exports_1("SubjectSubscription", SubjectSubscription);
        }
    };
});
//# sourceMappingURL=SubjectSubscription.js.map