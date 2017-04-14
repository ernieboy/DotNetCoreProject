System.register(["./AsyncAction", "./AsyncScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsyncAction_1, AsyncScheduler_1, async;
    return {
        setters: [
            function (AsyncAction_1_1) {
                AsyncAction_1 = AsyncAction_1_1;
            },
            function (AsyncScheduler_1_1) {
                AsyncScheduler_1 = AsyncScheduler_1_1;
            }
        ],
        execute: function () {
            /**
             *
             * Async Scheduler
             *
             * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
             *
             * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
             * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
             * in intervals.
             *
             * If you just want to "defer" task, that is to perform it right after currently
             * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
             * better choice will be the {@link asap} scheduler.
             *
             * @example <caption>Use async scheduler to delay task</caption>
             * const task = () => console.log('it works!');
             *
             * Rx.Scheduler.async.schedule(task, 2000);
             *
             * // After 2 seconds logs:
             * // "it works!"
             *
             *
             * @example <caption>Use async scheduler to repeat task in intervals</caption>
             * function task(state) {
             *   console.log(state);
             *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
             *                                   // which we reschedule with new state and delay
             * }
             *
             * Rx.Scheduler.async.schedule(task, 3000, 0);
             *
             * // Logs:
             * // 0 after 3s
             * // 1 after 4s
             * // 2 after 5s
             * // 3 after 6s
             *
             * @static true
             * @name async
             * @owner Scheduler
             */
            exports_1("async", async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction));
        }
    };
});
//# sourceMappingURL=async.js.map