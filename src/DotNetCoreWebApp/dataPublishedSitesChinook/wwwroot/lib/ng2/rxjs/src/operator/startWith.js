System.register(["../observable/ArrayObservable", "../observable/ScalarObservable", "../observable/EmptyObservable", "./concat", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits the items you specify as arguments before it begins to emit
     * items emitted by the source Observable.
     *
     * <img src="./img/startWith.png" width="100%">
     *
     * @param {...T} values - Items you want the modified Observable to emit first.
     * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
     * emitted by the source Observable.
     * @method startWith
     * @owner Observable
     */
    function startWith() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1) {
            return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
        }
        else if (len > 1) {
            return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
        }
        else {
            return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
        }
    }
    exports_1("startWith", startWith);
    var ArrayObservable_1, ScalarObservable_1, EmptyObservable_1, concat_1, isScheduler_1;
    return {
        setters: [
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (ScalarObservable_1_1) {
                ScalarObservable_1 = ScalarObservable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            },
            function (concat_1_1) {
                concat_1 = concat_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=startWith.js.map