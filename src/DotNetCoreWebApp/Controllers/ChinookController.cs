using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Business;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Models;
using DotNetCoreWebApp.EditModels;
using DotNetCoreWebApp.ViewModels;
using DotNetCoreWebAppModels.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreWebApp.Controllers
{

    public class ChinookController : BaseController
    {
        private readonly IEntityBusiness<Artist> _artistEntityBusiness;

        public ChinookController(
             IEntityBusiness<Artist> artistEntityBusiness, IHostingEnvironment hostingEnvironment)
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

                var model = new ArtistViewModel { ArtistsList = result.ObjectsDictionary["list"] as IEnumerable<Artist> };

                return View(model);
            });
        }

        public async Task<IActionResult> EditArtist(int id)
        {
            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                Artist fromDb = await _artistEntityBusiness.FindEntityById(id);
                ArtistEditModel model = _artistEntityBusiness.Map<Artist, ArtistEditModel>(fromDb);

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
                model.ObjectState = ObjectState.Modified;
                model.Deleted = false;
                Artist artist = _artistEntityBusiness.Map<ArtistEditModel, Artist>(model);

                await _artistEntityBusiness.PersistEntity(artist);
                TempData["saved"] = "y";
                return RedirectToAction("Artists");
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
                model.ObjectState = ObjectState.Added;
                Artist artist = _artistEntityBusiness.Map<ArtistEditModel, Artist>(model);
                await _artistEntityBusiness.PersistEntity(artist);
                TempData["saved"] = "y";
                return RedirectToAction("Artists");
            });
        }

        public IActionResult ArtistsAngular()
        {
            return View();
        }

        public async Task<IActionResult> DeleteArtist(long id)
        {
            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                Artist fromDb = await _artistEntityBusiness.FindEntityById(id);
                ArtistDeleteModel model = _artistEntityBusiness.Map<Artist, ArtistDeleteModel>(fromDb);
                return View(model);
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteArtist(ArtistDeleteModel model)
        {
            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                if (!ModelState.IsValid) return View(model);

                if (!model.DeleteConfirmed)
                {
                    Artist artistFromDb = await _artistEntityBusiness.FindEntityById(model.ArtistId);
                    model = _artistEntityBusiness.Map<Artist, ArtistDeleteModel>(artistFromDb);
                    ModelState.AddModelError("", "Please confirm that you would really like to delete this item.");
                    return View(model);
                }

                Artist artist =  _artistEntityBusiness.Map<ArtistDeleteModel, Artist>(model);
                artist.Deleted = true;
                artist.ObjectState = ObjectState.Deleted;
                await _artistEntityBusiness.PersistEntity(artist);
                TempData["deletedOk"] = true;
                return RedirectToAction("Artists");
            });
        }

        /*
        public ActionResult AppPath()
        {
            string webRootPath = hostingEnvironment.WebRootPath;
            string contentRootPath = hostingEnvironment.ContentRootPath;

            return Content(webRootPath + "\n" + contentRootPath);
        }
        */
    }
}