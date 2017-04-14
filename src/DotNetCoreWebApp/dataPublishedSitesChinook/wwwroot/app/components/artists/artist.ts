export interface IArtist {
    artistId: number;
    name: string;
    album: Array<any>;
    guid: string;
    dateCreated: string;
    dateModified: string;
    objectState: number;
    rowVersion: string;
    deleted: boolean;
}