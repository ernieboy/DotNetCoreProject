import { Component } from 'angular2/core';
import {enableProdMode} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';   // Load all features
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { ArtistsListingComponent } from './artists/artists-listing.component';
import {ArtistsService} from "./artists/artists.service";
import { ArtistEditComponent } from './artists/artist-edit.component';
import {WelcomeComponent} from './home/welcome.component';
import {ContactPageComponent} from './home/contact-page.component';

enableProdMode();

@Component({
    selector: 'main-app',
    templateUrl: '/app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ArtistsService,
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/home', name: 'Home', component: WelcomeComponent, useAsDefault: true },
    { path: '/artists-list', name: 'ArtiststList', component: ArtistsListingComponent },
    { path: '/artist-edit/:id', name: 'ArtistEdit', component: ArtistEditComponent },
    { path: '/contact', name: 'ContactPage', component: ContactPageComponent },
])
export class AppComponent {
    pageTitle: string = 'My  Application';
}

