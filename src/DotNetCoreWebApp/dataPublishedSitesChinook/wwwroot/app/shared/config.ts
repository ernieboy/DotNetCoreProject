declare var thisApplication: Object;
var appRoot: string = thisApplication.rootPath + '/';
var apiRoot: string = appRoot + 'api/';
export let Config = {
  pageActions: {
    list: 0,
    edit: 1,
    delete: 2,
    add: 3
  },
  apiUrls: {
      artistsListing: apiRoot + 'artists' ,
      findArtistById: apiRoot + 'artists/{id}'  
  },
  entityFrameworkEntityState: {
        Unchanged: 0,
        Added: 1,
        Modified: 2,
        Deleted: 3
  }
}