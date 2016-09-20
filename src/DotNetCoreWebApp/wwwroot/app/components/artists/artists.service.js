System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/observable/throw", "rxjs/Observable", 'rxjs/add/operator/toPromise', '../../shared/config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, config_1;
    var ArtistsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_5) {},
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            ArtistsService = (function () {
                function ArtistsService(_http) {
                    this._http = _http;
                }
                ArtistsService.prototype.getArtists = function (pageNumber, pageSize, searchTerms, sortColumn, sortDirection) {
                    if (pageNumber === void 0) { pageNumber = 1; }
                    if (pageSize === void 0) { pageSize = 20; }
                    if (searchTerms === void 0) { searchTerms = ''; }
                    if (sortColumn === void 0) { sortColumn = 'Name'; }
                    if (sortDirection === void 0) { sortDirection = 'ASC'; }
                    var paginationData = '?pageNumber=' + pageNumber +
                        '&pageSize=' + pageSize + '&searchTerms=' + searchTerms +
                        '&sortCol=' + sortColumn + '&sortDir=' + sortDirection;
                    return this._http.get(config_1.Config.apiUrls.artistsListing + paginationData)
                        .map(function (response) {
                        return response.json();
                    })
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
                };
                ArtistsService.prototype.getArtistById = function (id) {
                    var url = config_1.Config.apiUrls.findArtistById.replace('{id}', id.toString());
                    return this._http.get(url)
                        .map(function (response) {
                        return response.json();
                    })
                        .toPromise();
                };
                ArtistsService.prototype.extractData = function (res) {
                    return res;
                };
                ArtistsService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                ArtistsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], ArtistsService);
                return ArtistsService;
                var _a;
            }());
            exports_1("ArtistsService", ArtistsService);
        }
    }
});
//# sourceMappingURL=artists.service.js.map