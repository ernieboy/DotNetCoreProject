using Core.Common.Data.Interfaces;

namespace DotNetCoreWebApp.EditModels
{
    public class ArtistEditModel :BaseEditModel
    {
        public string Name { get; set; }
        public long ArtistId { get; set; }
        public bool Deleted { get; set; }
        public ObjectState ObjectState { get; set; }    
    }
}