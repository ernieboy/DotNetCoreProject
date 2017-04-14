System.register(["./AsapAction", "./AsapScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsapAction_1, AsapScheduler_1, asap;
    return {
        setters: [
            function (AsapAction_1_1) {
                AsapAction_1 = AsapAction_1_1;
            },
            function (AsapScheduler_1_1) {
                AsapScheduler_1 = AsapScheduler_1_1;
            }
        ],
        execute: function () {
            /**
             *
             * Asap Scheduler
             *
             * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
             *
             * `asap` scheduler behaves the same as {@link async} scheduler when you use it to delay task
             * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
             * code to end and then it will try to execute given task as fast as possible.
             *
             * `asap` scheduler will do its best to minimize time between end of currently executing code
             * and start of scheduled task. This makes it best candidate for performing so called "deferring".
             * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
             * some (although minimal) unwanted delay.
             *
             * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
             * after currently executing code. In particular, if some task was also scheduled with `asap` before,
             * that task will execute first. That being said, if you need to schedule task asynchronously, but
             * as soon as possible, `asap` scheduler is your best bet.
             *
             * @example <caption>Compare async and asap scheduler</caption>
             *
             * Rx.Scheduler.async.schedule(() => console.log('async')); // scheduling 'async' first...
             * Rx.Scheduler.asap.schedule(() => console.log('asap'));
             *
             * // Logs:
             * // "asap"
             * // "async"
             * // ... but 'asap' goes first!
             *
             * @static true
             * @name asap
             * @owner Scheduler
             */
            exports_1("asap", asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction));
        }
    };
});
//# sourceMappingURL=asap.js.map