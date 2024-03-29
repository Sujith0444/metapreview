using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace meta_preview.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string initialUrl = "https://www.cybrosys.com";
            GetData(initialUrl);
            ViewBag.Url = initialUrl;
            return View();
        }
        [HttpPost]
        public ActionResult GetData(string url)
        {
            try
            {
                Uri uri = new Uri(url);
                string domain = uri.Host.Replace("www.", "");
                WebClient client = new WebClient();
                string html = client.DownloadString(url);

                string title = Regex.Match(html, @"<title>\s*(.+?)\s*</title>").Groups[1].Value;
                string description = Regex.Match(html, @"<meta\s+name=""description""\s+content=""(.*?)""\s*/?>").Groups[1].Value;
                string ogUrl = Regex.Match(html, @"<meta\s+property=""og:image""\s+content=""(.*?)""\s*/?>").Groups[1].Value;

                ViewBag.urlTitle = title;
                ViewBag.Description = description;
                ViewBag.Url = url;
                ViewBag.Domain = domain;
                ViewBag.imgurl = ogUrl;
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
            }

            return View("Index");
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}