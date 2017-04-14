System.register(["angular2/core", "./artists.service", "../../shared/base.listing.component", "angular2/router", "../../shared/pagination.component"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, artists_service_1, base_listing_component_1, router_1, pagination_component_1, ArtistsListingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (base_listing_component_1_1) {
                base_listing_component_1 = base_listing_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }
        ],
        execute: function () {
            ArtistsListingComponent = (function (_super) {
                __extends(ArtistsListingComponent, _super);
                function ArtistsListingComponent(_artistsService) {
                    var _this = _super.call(this) || this;
                    _this._artistsService = _artistsService;
                    return _this;
                }
                ArtistsListingComponent.prototype.ngOnInit = function () {
                    this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
                };
                ArtistsListingComponent.prototype.pageData = function (pageNumber, pageSize, searchTerms, sortColumn, sortDirection) {
                    var _this = this;
                    this.pageNumber = pageNumber;
                    this.pageSize = pageSize;
                    this.searchTerms = (searchTerms == null ? '' : searchTerms);
                    this.sortColumn = sortColumn;
                    this.sortDirection = sortDirection;
                    this._artistsService.getArtists(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection)
                        .then(function (response) {
                        _this.paginationData = response.paginationData;
                        _this.initPagesArray();
                        _this.artists = response.list;
                    });
                };
                ArtistsListingComponent.prototype.onPageNumberChanged = function (newPageNumber) {
                    this.pageNumber = newPageNumber;
                    this.pageData(newPageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
                };
                ArtistsListingComponent.prototype.clearSearch = function () {
                    _super.prototype.clearSearch.call(this);
                    this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
                };
                return ArtistsListingComponent;
            }(base_listing_component_1.BaseListingComponent));
            ArtistsListingComponent = __decorate([
                core_1.Component({
                    templateUrl: "/app/components/artists/artists-listing.component.html",
                    directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent]
                }),
                __metadata("design:paramtypes", [artists_service_1.ArtistsService])
            ], ArtistsListingComponent);
            exports_1("ArtistsListingComponent", ArtistsListingComponent);
        }
    };
});
//# sourceMappingURL=artists-listing.component.js.map