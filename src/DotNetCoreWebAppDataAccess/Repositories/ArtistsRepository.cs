using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Repositories;
using DotNetCoreWebAppModels.Models;
using LinqKit;

namespace DotNetCoreWebAppDataAccess.Repositories
{
    public class ArtistsRepository : EfDataRepositoryBase<Artist, ChinookSqliteDbContext>,
     IArtistsRepository
    {
        public ArtistsRepository()
        { }

        public ArtistsRepository(ChinookSqliteDbContext context)
        {
            Context = context;
        }
        /*
        override protected async Task<Artist> FindSingleEntityById(int id)
        {
            return await Task.FromResult(Context.Set<Artist>().SingleOrDefault(x => x.ArtistId == id));
        }
        */

        protected override void AddOrUpdate(Artist entity)
        {
            if (entity.ArtistId == default(int) && entity.ObjectState == ObjectState.Added)
            {
                Context.Add(entity);
            }
            else
            {
                Context.Attach(entity);
            }
        }
    }
}