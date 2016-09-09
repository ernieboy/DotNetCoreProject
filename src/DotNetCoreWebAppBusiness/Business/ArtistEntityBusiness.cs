using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Common.Data.Models;
using Core.Common.Extensions;
using Core.Common.Utilities;
using DotNetCoreWebApp.Business;
using DotNetCoreWebAppBusiness.Business.Interfaces;
using DotNetCoreWebAppDataAccess.Repositories;
using DotNetCoreWebAppModels.Models;
using LinqKit;
using System.Linq;

namespace DotNetCoreWebAppBusiness.Business
{
    public class ArtistEntityBusiness : EntityBusinessBase<Artist>, IArtistEntityBusiness
    {
        private readonly IArtistsRepository _artistsRepository;
        public ArtistEntityBusiness(IArtistsRepository artistsRepository)
        {
            _artistsRepository = artistsRepository;
        }

        public async Task<Artist> FindEntityById(int id)
        {
            Artist artist = await _artistsRepository.FindEntityById(id);
            return artist;
        }

        public OperationResult ListItems(
            int? pageNumber, int? pageSize, string sortCol, string sortDir, string searchTerms)
        {
            var result = new OperationResult();
            sortCol = sortCol ?? "Name";
            sortDir = sortDir ?? "ASC";

            string[] searchKeywords = !searchTerms.IsNullOrWhiteSpace() ? searchTerms.Split(',') : new string[] { };

            int totalNumberOfRecords;
            int totalNumberOfPages;
            int offset;
            int offsetUpperBound;

            var list = FindAllEntitiesByCriteria(
                        pageNumber,
                         pageSize,
                         out totalNumberOfRecords,
                         sortCol,
                        sortDir,
                        out offset,
                        out offsetUpperBound,
                        out totalNumberOfPages,
                        result,
                        searchKeywords);
            result.AddResultObject("list", list);
            return result;
        }

        public async Task<bool> PersistEntity(Artist entity)
        {
            return await _artistsRepository.PersistEntity(entity);
        }

        protected override IEnumerable<Artist> FindAllEntitiesByCriteria(
                    int? pageNumber,
                    int? pageSize,
                    out int totalRecords,
                    string sortColumn,
                    string sortDirection,
                     out int offset,
                    out int offsetUpperBound,
                    out int totalNumberOfPages,
                    OperationResult result,
                    string[] keywords)
        {
            if (_artistsRepository == null) throw new Exception(nameof(_artistsRepository));
            if (sortColumn.IsNullOrWhiteSpace()) Error.ArgumentNull(nameof(sortColumn));
            if (sortDirection.IsNullOrWhiteSpace()) Error.ArgumentNull(nameof(sortDirection));

            int pageIndex = pageNumber ?? 1;
            int sizeOfPage = pageSize ?? 10;

            var searchFilter = BuildSearchFilterPredicate(keywords);

            var items = _artistsRepository.FindAllEntitiesByCriteria(
                 pageIndex, sizeOfPage, out totalRecords, sortColumn, sortDirection, searchFilter);

            totalNumberOfPages = (int)Math.Ceiling((double)totalRecords / sizeOfPage);

            offset = (pageIndex - 1) * sizeOfPage + 1;
            offsetUpperBound = offset + (sizeOfPage - 1);
            if (offsetUpperBound > totalRecords) offsetUpperBound = totalRecords;

            result.AddResultObject("sortCol", sortColumn);
            result.AddResultObject("sortDir", sortDirection);
            result.AddResultObject("offset", offset);
            result.AddResultObject("pageIndex", pageIndex);
            result.AddResultObject("sizeOfPage", sizeOfPage);
            result.AddResultObject("offsetUpperBound", offsetUpperBound);
            result.AddResultObject("totalNumberOfRecords", totalRecords);
            result.AddResultObject("totalNumberOfPages", totalNumberOfPages);
              result.AddResultObject("searchTerms", string.Join(",", keywords.Select(i => i.ToString())));

            return items;
        }

        /// <summary>
        /// Returns a predicate to filter the data by based on the keywords supplied
        /// </summary>
        /// <param name="keywords">Keywords to filter by</param>
        /// <returns>An expression to use for filtering</returns>
        private ExpressionStarter<Artist> BuildSearchFilterPredicate(string[] keywords)
        {
            Expression<Func<Artist, bool>> filterExpression = a => true;
            ExpressionStarter<Artist> predicate = PredicateBuilder.New(filterExpression);
            bool isFilteredQuery = keywords.Any();
            if (!isFilteredQuery) return predicate;

            predicate = filterExpression = a => false;
            foreach (var keyword in keywords)
            {
                var temp = keyword;
                if (temp == null) continue;
                predicate = predicate.Or(p => p.Name.ToLower().Contains(temp.ToLower()));
            }
            return predicate;
        }
    }
}