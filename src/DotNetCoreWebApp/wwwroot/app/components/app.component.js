System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'angular2/router', './artists/artists-listing.component', "./artists/artists.service", './artists/artist-edit.component', './home/welcome.component', './home/contact-page.component'], function(exports_1, context_1) {
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
    var core_1, core_2, http_1, router_1, artists_listing_component_1, artists_service_1, artist_edit_component_1, welcome_component_1, contact_page_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (artists_listing_component_1_1) {
                artists_listing_component_1 = artists_listing_component_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (artist_edit_component_1_1) {
                artist_edit_component_1 = artist_edit_component_1_1;
            },
            function (welcome_component_1_1) {
                welcome_component_1 = welcome_component_1_1;
            },
            function (contact_page_component_1_1) {
                contact_page_component_1 = contact_page_component_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            AppComponent = (function () {
                function AppComponent() {
                    this.pageTitle = 'My  Application';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'main-app',
                        templateUrl: '/app/components/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [artists_service_1.ArtistsService,
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        { path: '/home', name: 'Home', component: welcome_component_1.WelcomeComponent, useAsDefault: true },
                        { path: '/artists-list', name: 'ArtiststList', component: artists_listing_component_1.ArtistsListingComponent },
                        { path: '/artist-edit/:id', name: 'ArtistEdit', component: artist_edit_component_1.ArtistEditComponent },
                        { path: '/contact', name: 'ContactPage', component: contact_page_component_1.ContactPageComponent },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map