
import {Component, OnInit} from 'angular2/core';
import {ArtistsService} from "./artists.service";
import {IArtist} from "./artist";
import {IPaginationData} from "../../shared/interfaces/IPaginationData"
import {BaseListingComponent} from '../../shared/base.listing.component';
import {ROUTER_DIRECTIVES } from 'angular2/router';
import {PaginationComponent} from '../../shared/pagination.component'

@Component({
    templateUrl: "/app/components/artists/artists-listing.component.html",
    directives: [ROUTER_DIRECTIVES, PaginationComponent]
})
export class ArtistsListingComponent extends BaseListingComponent implements OnInit {
    artists: IArtist[];

    constructor(private _artistsService: ArtistsService) {
        super();
    }

    ngOnInit(): void {
        this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    }


    pageData(pageNumber: number, pageSize: number, searchTerms: string,
        sortColumn: string, sortDirection: string): void {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.searchTerms = (searchTerms == null ? '' : searchTerms);
        this.sortColumn = sortColumn;
        this.sortDirection = sortDirection;

        this._artistsService.getArtists(
            this.pageNumber,
            this.pageSize,
            this.searchTerms,
            this.sortColumn,
            this.sortDirection)
            .then(response => {
                this.paginationData = <IPaginationData>response.paginationData;
                this.initPagesArray();
                this.artists = <IArtist[]>response.list;
            }
            );
    }    

    onPageNumberChanged(newPageNumber: number) : void {
         this.pageNumber = newPageNumber;
        this.pageData(newPageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    }

    protected clearSearch(): void {
        super.clearSearch();
        this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    }
}

