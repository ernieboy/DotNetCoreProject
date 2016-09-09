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

        protected override IEnumerable<Artist> FindAllByCriteria(            
            int? pageNumber,
            int? pageSize,
            out int totalRecords,
            string sortColumn,
            string sortDirection,
            ExpressionStarter<Artist> predicate)
        {
            int pageIndex = pageNumber ?? 1;
            int sizeOfPage = pageSize ?? 10;
            if (pageIndex < 1) pageIndex = 1;
            if (sizeOfPage < 1) sizeOfPage = 5;
            int skipValue = (sizeOfPage * (pageIndex - 1));
            var searchFilter = predicate ?? BuildDefaultSearchFilterPredicate();

            totalRecords =
               Context.Artist.AsExpandable().Where(searchFilter).OrderBy(am => am.Name).Count();
            var artists =
                Context.Artist.AsExpandable()
                    .Where(searchFilter)
                    .OrderBy($"{sortColumn} {sortDirection}")
                    .Skip(skipValue)
                    .Take(sizeOfPage)
                    .ToList();
            return artists;

        }

        override protected async  Task<Artist> FindSingleEntityById(int id)
        {
            return await  Task.FromResult(Context.Set<Artist>().SingleOrDefault(x => x.ArtistId == id));
        }

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