using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Models;
using Core.Common.Utilities;

namespace DotNetCoreWebAppModels.Models
{
    public sealed  class Artist : BaseObjectWithState, IObjectWithState
    {
        public Artist()
        {
            Album = new HashSet<Album>();
            Guid = StringUtils.GenerateLowercase32DigitsGuid();
            DateCreated = DateTime.Now;
            DateModified = DateCreated;
        }

        [Key]
        public long ArtistId { get; set; }
  
        public string Name { get; set; }

        public ICollection<Album> Album { get; set; }
    }
}
