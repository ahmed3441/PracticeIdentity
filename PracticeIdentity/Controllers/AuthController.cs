using Azure.Core;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticeIdentity.Data;
using PracticeIdentity.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace PracticeIdentity.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public object Mydata { get; private set; }

        public AuthController(ILogger<AuthController> logger, ApplicationDbContext appContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _dbContext = appContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult signup()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> signup(UserViewModel userViewModel)
        {
            var user = new User()
            {
                UserName = userViewModel.Name,
                Email = userViewModel.Email,
                
            };
            var status = await _userManager.CreateAsync(user, userViewModel.Password);

            return RedirectToAction("signup");
        }

        [HttpGet]
        public IActionResult login()
        {           
            return View();
        }

        [HttpPost]
        public async Task <IActionResult> login(UserLoginViewModel userLoginViewModel) 
        {
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByEmailAsync(userLoginViewModel.Email);
                    if(user != null)
                    {
                        var result = await _signInManager.PasswordSignInAsync(user, userLoginViewModel.Password, false, false);
                        if (result.Succeeded)
                        {
                            return RedirectToAction("AddRoom", "Room");
                        }
                    }
                    ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
                }

                return View(userLoginViewModel);
            }
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("login","Auth");
        }
    }
}
