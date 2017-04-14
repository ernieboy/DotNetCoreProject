import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {IArtist} from "./artist";
import {ArtistsService} from "./artists.service";

@Component({
    templateUrl: '/app/components/artists/artist-edit.component.html'
})

export class ArtistEditComponent implements OnInit {
    private artistId: number;
    private pageTitle: string = 'Edit artist with ID ';
    private artist: IArtist;

    constructor(private _routeParams: RouteParams,
        private _router: Router,
        private _artistsService: ArtistsService) {
        this.artistId = + this._routeParams.get('id');
    }

    ngOnInit(): void {
        this._artistsService.getArtistById(this.artistId)
            .then(response => {
                this.artist = <IArtist>response;
                this.pageTitle += ` ${this.artist.name}`;
            }
            );
    }

    cancel(): void {
        this._router.navigate(['ArtiststList']);
    }


}