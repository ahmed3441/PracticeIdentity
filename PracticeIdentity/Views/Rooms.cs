using Microsoft.AspNetCore.Mvc;

namespace PracticeIdentity.Views
{
    public class Rooms : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult AddRoom()
        {
            return View();
        }
    }
}
