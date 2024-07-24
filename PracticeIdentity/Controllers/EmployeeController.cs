using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticeIdentity.Data;
using PracticeIdentity.Models;

namespace PracticeIdentity.Controllers
{
    [Authorize]
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        public EmployeeController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Employee()
        {
            return View();
        }

        [HttpGet]
        public IActionResult EmployeeDetails()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> EmployeeDetails(EmployeeViewModel employeeViewModel)
        {
            try { 
            var employees = new Employee()
            {
                EmployeeName = employeeViewModel.EmployeeName,
                EmployeeMobileNo = int.Parse(employeeViewModel.Mobile),
                EmploeeGender = employeeViewModel.EmployeeGender,
                EmployeeEmailId = employeeViewModel.EmployeeEmailId,
            };
            await _dbContext.Employees.AddAsync(employees);
            await _dbContext.SaveChangesAsync();

            return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IActionResult GetEmployee(DataSourceLoadOptions loadOptions)
        {
            try { 
            var employees = _dbContext.Employees.Select(x => new { x.EmployeeId, x.EmployeeName, x.EmployeeMobileNo, x.EmploeeGender, x.EmployeeEmailId }).ToList();
            var result = DataSourceLoader.Load(employees, loadOptions);

            return Json(result);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetEmployeeById(Guid id)
        {
            try { 
            var emp = _dbContext.Employees.Where(x => x.EmployeeId == id).FirstOrDefault();

            return Json(emp);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPut]
        public async Task<JsonResult> UpdateEmployee(Employee model)
        {
            try { 
            var record = _dbContext.Employees.Where(x => x.EmployeeId == model.EmployeeId).FirstOrDefault();
            record.EmployeeName = model.EmployeeName;
            record.EmployeeMobileNo = model.EmployeeMobileNo;
            record.EmploeeGender = model.EmploeeGender;
            record.EmployeeEmailId = model.EmployeeEmailId;
            _dbContext.Employees.Update(record);
            await _dbContext.SaveChangesAsync();

            return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> deleteEmployee(Guid id)
        {
            try { 
            var record = _dbContext.Employees.Where(x => x.EmployeeId == id).FirstOrDefault();
            _dbContext.Employees.Remove(record);
            _dbContext.SaveChanges();

            return Json(true);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}
