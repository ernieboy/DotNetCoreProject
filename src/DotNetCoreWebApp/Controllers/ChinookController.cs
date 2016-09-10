using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Models;
using DotNetCoreWebApp.EditModels;
using DotNetCoreWebApp.ViewModels;
using DotNetCoreWebAppBusiness.Business.Interfaces;
using DotNetCoreWebAppModels.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreWebApp.Controllers
{

    public class ChinookController : BaseController
    {
        private readonly IArtistEntityBusiness _artistEntityBusiness;

        public ChinookController(
             IArtistEntityBusiness artistEntityBusiness, IHostingEnvironment hostingEnvironment)
        {
            _artistEntityBusiness = artistEntityBusiness;
            this.hostingEnvironment = hostingEnvironment;

        }

        public IActionResult Artists(
            int? pageNumber, int? pageSize, string sortCol,
            string sortDir, string searchTerms)
        {
            return ExecuteExceptionsHandledActionResult(() =>
            {
                OperationResult result = _artistEntityBusiness.ListItems(
                pageNumber, pageSize, sortCol, sortDir, searchTerms);

                ViewBag.offset = result.ObjectsDictionary["offset"];
                ViewBag.pageIndex = result.ObjectsDictionary["pageIndex"];
                ViewBag.sizeOfPage = result.ObjectsDictionary["sizeOfPage"];
                ViewBag.offsetUpperBound = result.ObjectsDictionary["offsetUpperBound"];
                ViewBag.totalRecords = result.ObjectsDictionary["totalNumberOfRecords"];
                ViewBag.totalNumberOfPages = result.ObjectsDictionary["totalNumberOfPages"];
                ViewBag.searchTerms = result.ObjectsDictionary["searchTerms"];
                ViewBag.sortCol = result.ObjectsDictionary["sortCol"];
                ViewBag.sortDir = result.ObjectsDictionary["sortDir"];

                var model = new ArtistViewModel {ArtistsList = result.ObjectsDictionary["list"] as IEnumerable<Artist>};

                return View(model);
            });
        }

        public async Task<IActionResult> EditArtist(int id)
        {
            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                Artist fromDb = await _artistEntityBusiness.FindEntityById(id);
              var model = new ArtistEditModel {Name = fromDb.Name, ArtistId = fromDb.ArtistId};
              return View(model);
          });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditArtist(ArtistEditModel model)
        {
            if (model == null) return View();

            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                var artist = new Artist
                {
                    Name = model.Name,
                    ArtistId = model.ArtistId,
                    ObjectState = ObjectState.Modified,
                    Deleted = false
                };
                await _artistEntityBusiness.PersistEntity(artist);
                return View(model);
            });
        }

        public IActionResult AddArtist()
        {
            return ExecuteExceptionsHandledActionResult(() =>
          {
              return View();
          });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddArtist(ArtistEditModel model)
        {
            if (model == null) return View();

            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                var artist = new Artist
                {
                    Name = model.Name,
                    ObjectState = ObjectState.Added,
                    Deleted = false
                };
                await _artistEntityBusiness.PersistEntity(artist);
                return View(model);
            });
        }

        public IActionResult ArtistsAngular()
        {
            return View();
        }

        public ActionResult AppPath()
        {
            string webRootPath = hostingEnvironment.WebRootPath;
            string contentRootPath = hostingEnvironment.ContentRootPath;

            return Content(webRootPath + "\n" + contentRootPath);
        }
    }
}