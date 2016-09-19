using System;
using System.Linq.Expressions;
using Core.Common.Data.Models;
using Core.Common.Extensions;
using Core.Common.Data.Business;
using DotNetCoreWebAppBusiness.Business.Interfaces;
using DotNetCoreWebAppModels.Models;
using LinqKit;
using System.Linq;
using Core.Common.Data.Interfaces;

namespace DotNetCoreWebAppBusiness.Business
{
    public class ArtistEntityBusiness : EntityBusinessBase<Artist>, IArtistEntityBusiness
    {
        public ArtistEntityBusiness(IDataRepository<Artist> repository): base(repository)
        {}

        public OperationResult ListItems(
            int? pageNumber, int? pageSize, string sortCol, string sortDir, string searchTerms)
        {
            var result = new OperationResult();
            sortCol = sortCol ?? "Name";
            sortDir = sortDir ?? "ASC";

            string[] searchKeywords = !searchTerms.IsNullOrWhiteSpace() ? searchTerms.Split(',') : new string[] { };
            result.AddResultObject("keywords", searchKeywords);

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
                        BuildSearchFilterPredicate(searchKeywords));
            result.AddResultObject("list", list);
            return result;
        }

        /// <summary>
        /// Returns a predicate to filter the data by based on the keywords supplied
        /// </summary>
        /// <param name="keywords">Keywords to filter by</param>
        /// <returns>An expression to use for filtering</returns>
        protected override ExpressionStarter<Artist> BuildSearchFilterPredicate(string[] keywords)
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