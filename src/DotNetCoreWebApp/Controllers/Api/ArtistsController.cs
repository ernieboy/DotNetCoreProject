using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Business;
using Core.Common.Data.Models;
using DotNetCoreWebAppModels.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreWebApp.Controllers.Api
{
    [Route("api/[controller]")]
    public sealed class ArtistsController : BaseApiController
    {

        private readonly IEntityBusiness<Artist> _artistEntityBusiness;

        public ArtistsController(IEntityBusiness<Artist> artistEntityBusiness)
        {
            _artistEntityBusiness = artistEntityBusiness;
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> FindById(int id)
        {
            var artist = await _artistEntityBusiness.FindEntityById(id);
            return Json(artist);
        }
        


        [HttpGet]
        [Route("")]
        public IActionResult GetAll(
            int? pageNumber, int? pageSize, string sortCol,
            string sortDir, string searchTerms)
        {

            OperationResult result = _artistEntityBusiness.ListItems(
                pageNumber, pageSize, sortCol, sortDir, searchTerms);


            var paginationData = new PaginationData
            {
                OffsetFromZero = (int)result.ObjectsDictionary["offset"],
                PageNumber = (int)result.ObjectsDictionary["pageIndex"],
                PageSize = (int)result.ObjectsDictionary["sizeOfPage"],
                OffsetUpperBound = (int)result.ObjectsDictionary["offsetUpperBound"],
                TotalNumberOfRecords = (int)result.ObjectsDictionary["totalNumberOfRecords"],
                TotalNumberOfPages = (int)result.ObjectsDictionary["totalNumberOfPages"],
                SearchTermsCommaSeparated = result.ObjectsDictionary["searchTerms"].ToString(),
                SortColumn = result.ObjectsDictionary["sortCol"].ToString(),
                SortDirection = result.ObjectsDictionary["sortDir"].ToString()
            };
            var list = result.ObjectsDictionary["list"] as IEnumerable<Artist>;
            var toReturn = Json(new { list, paginationData });

            return toReturn;
        }

    }
}