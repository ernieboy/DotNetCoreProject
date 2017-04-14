import {Component} from "angular2/core";
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    templateUrl : "/app/components/home/welcome.component.html",
    directives: [ROUTER_DIRECTIVES]
})
export class WelcomeComponent {
    someValue: number = 300;
}