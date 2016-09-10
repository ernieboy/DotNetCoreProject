using Core.Common.Data.Repositories;
using DotNetCoreWebAppModels.Models;

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
       
    }
}