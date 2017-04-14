System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BaseListingComponent;
    return {
        setters: [],
        execute: function () {
            BaseListingComponent = (function () {
                function BaseListingComponent() {
                    this.pageNumber = 1;
                    this.pageSize = 10;
                    this.searchTerms = '';
                    this.sortColumn = 'Name';
                    this.sortDirection = 'ASC';
                    this.isLoading = true;
                }
                BaseListingComponent.prototype.initPagesArray = function () {
                    if (!this.paginationData)
                        return;
                    this.pagesArray = [];
                    for (var i = 1; i <= this.paginationData.totalNumberOfPages; i++) {
                        this.pagesArray.push(i);
                    }
                };
                BaseListingComponent.prototype.clearSearch = function () {
                    this.searchTerms = '';
                };
                return BaseListingComponent;
            }());
            exports_1("BaseListingComponent", BaseListingComponent);
        }
    };
});
//# sourceMappingURL=base.listing.component.js.map