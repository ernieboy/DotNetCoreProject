using DotNetCoreLibrary.Core.Common.Utilities;
using DotNetCoreWebApp.EditModels;
using DotNetCoreWebAppModels.Models;

namespace DotNetCoreWebApp.ObjectMappers
{
    public class ArtistMapper
    {
        public static Artist MapArtistFromArtistEditModel(ArtistEditModel model)
        {
            Artist artist = new SimpleObjectMapper<ArtistEditModel, Artist>()
                .Map(model);
            return artist;
        }

        public static ArtistEditModel MapArtistEditModelFromArtist(Artist artist)
        {
            ArtistEditModel model = new SimpleObjectMapper<Artist, ArtistEditModel>().Map(artist);
            return model;
        }
    }
}
