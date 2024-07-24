using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticeIdentity.Data;
using PracticeIdentity.Migrations;
using PracticeIdentity.Models;
using PracticeIdentity.Views;
using static System.Runtime.InteropServices.JavaScript.JSType; 

namespace PracticeIdentity.Controllers
{
    [Authorize]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomerController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
       
        public IActionResult CustomerRegisteration()
        {
            return View();
        }

        [HttpGet]
        public IActionResult CheckOut()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> AddCustomer(CustomerViewModel customerViewModel)
        {
            try
            {
                var customer = new Customer()
                {
                    CustomerName = customerViewModel.CustomerName,
                    MobileNo = customerViewModel.MobileNo,
                    Nationality = customerViewModel.Nationality,
                    Gender = customerViewModel.Gender,
                    DateOfBirth = customerViewModel.DateOfBirth,
                    IdProof = customerViewModel.IdProof,
                    Address = customerViewModel.Address,
                  //  CheckIn = customerViewModel.CheckIn,
                  //  RoomIdFK = customerViewModel.RoomNo
                };
                await _dbContext.Customer.AddAsync(customer);
                await _dbContext.SaveChangesAsync();
                //for rooms booked true
                //var room = _dbContext.Rooms.Where(x => x.RoomId == customerViewModel.RoomNo).FirstOrDefault();
                //room.Booked = true;
                //await _dbContext.Customer.AddAsync(customer);
                // _dbContext.Rooms.Update(room);
                //await _dbContext.SaveChangesAsync();

                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }

        [HttpGet]
        public IActionResult GetCustomerGrid(DataSourceLoadOptions loadOptions)
        {
            try
            {
                var customers = _dbContext.Customer.Select(x => new { x.CustomerId,x.CustomerName, x.MobileNo, x.Nationality, x.Gender, x.DateOfBirth, x.IdProof, x.Address }).ToList();
                var result = DataSourceLoader.Load(customers, loadOptions);

                return Json(result);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        //[HttpGet]
        //public IActionResult GetCustomerGrid(DataSourceLoadOptions loadOptions)
        //{
        //    try {
        //        var query = from Customer in _dbContext.Customer.AsQueryable()
        //                join Room in _dbContext.Rooms.AsQueryable() on Customer.RoomIdFK equals Room.RoomId
        //                where Room.Booked == true && Customer.CheckOut == null
        //                    select new
        //                {
        //                    Customer.CustomerId,
        //                    Customer.CustomerName,
        //                    Customer.MobileNo,
        //                    Customer.Nationality,
        //                    Customer.Gender,
        //                    Customer.DateOfBirth,
        //                    Customer.IdProof,
        //                    Customer.Address,
        //                    Customer.CheckIn,
        //                    Room.RoomId,
        //                    Room.RoomNo,
        //                    Room.RoomType,
        //                    Room.Bed,
        //                    Room.Price
        //                };
        //    var customers = query.ToList();
        //    var result = DataSourceLoader.Load(customers, loadOptions);

        //        return Json(result);
        //    }

        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}

        [HttpGet]
        public async Task<JsonResult> GetCustomerById(Guid id, Guid roomId, Guid customerInRoomId)
        {
            try
            {
                var customer = _dbContext.Customer.Where(x => x.CustomerId == id).FirstOrDefault();
                var rooms = _dbContext.Rooms.Where(x => x.RoomId == roomId).FirstOrDefault();
                var cusInroom = _dbContext.CustomersInRooms. Where(x=>x.CustomersInRoomsId == id).FirstOrDefault();
                return new JsonResult(new { Customer = customer, Rooms = rooms, CustomersInRoomsId= customerInRoomId });
              //  Console.WriteLine("helloooo",Json(customer, rooms));

               // return Json(customer, rooms);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        //[HttpGet]
        //public async Task<JsonResult> GetCustomerRoomById(Guid id, Guid roomId)
        //{
        //    try
        //    {
        //        var customer = _dbContext.Customer.Where(x => x.CustomerId == id).FirstOrDefault();
        //        var rooms = _dbContext.Rooms.Where(x => x.RoomId == roomId).FirstOrDefault();
        //        return Json(customer, rooms);
        //    }

        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}



        [HttpPut]
        public async Task<JsonResult> UpdateCustomers(Customer model)
        {
            try
            {
                var record = _dbContext.Customer.Where(x => x.CustomerId == model.CustomerId).FirstOrDefault();
                record.CustomerName = model.CustomerName;
                record.MobileNo = model.MobileNo;
                record.Nationality = model.Nationality;
                record.Gender = model.Gender;
                record.DateOfBirth=model.DateOfBirth;
                record.IdProof = model.IdProof;
                record.Address = model.Address;
                _dbContext.Customer.Update(record);
                await _dbContext.SaveChangesAsync();

                return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        //[HttpGet]
        //public async Task<JsonResult> GetCustomerById(Guid id, string roomNo, string customerName)
        //{
        //    try
        //    {
        //        var customer = _dbContext.Customer.Where(x => x.CustomerId == id).FirstOrDefault();

        //        var result = new
        //        {
        //            Customer = customer,
        //            RoomNo = roomNo,
        //            CustomerName = customerName
        //        };

        //        return Json(result);
        //    }

        //    catch (Exception ex)
        //    {
        //        return Json(new { error = ex.Message });
        //    }
        //}

        //[HttpPost]
        //public async Task<ActionResult> AddCheckOut(Guid customerId, Guid roomId, string checkOut)
        //{
        //    try { 
        //    var rooms = _dbContext.Rooms.Where(x => x.RoomId == roomId).FirstOrDefault();
        //    var customer = _dbContext.Customer.Where(x=>x.CustomerId==customerId).FirstOrDefault();

        //    if (customer != null && customer.RoomIdFK != null)
        //    {
        //        rooms.Booked = false;
        //            customer.CheckOut = checkOut.ToString();
        //           // customer.CheckOut = DateTime.Now.ToString();
        //        await _dbContext.SaveChangesAsync();

        //        return Json(new { success = true });
        //    }
        //    else
        //    {
        //        return Json(new { error = "Customer or Room not found" });
        //    }
        //    }

        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}

        //[HttpGet]
        //public IActionResult GetCustomerCheckOutGrid(DataSourceLoadOptions loadOptions)
        //{
        //    try { 
        //    var query = from Customer in _dbContext.Customer.AsQueryable()
        //                join Room in _dbContext.Rooms.AsQueryable() on Customer.RoomIdFK equals Room.RoomId
        //                where Customer.CheckOut!=null      //Room.Booked == false && Customer.CheckOut != null              //!string.IsNullOrEmpty(Customer.CheckOut)

        //                select new
        //                {
        //                    Customer.CustomerId,
        //                    Customer.CustomerName,
        //                    Customer.MobileNo,
        //                    Customer.Nationality,
        //                    Customer.Gender,
        //                    Customer.DateOfBirth,
        //                    Customer.IdProof,
        //                    Customer.Address,
        //                    Customer.CheckIn,
        //                    Customer.CheckOut,
        //                    Room.RoomId,
        //                    Room.RoomNo,
        //                    Room.RoomType,
        //                    Room.Bed,
        //                    Room.Price
        //                };
        //    var checkout = query.ToList();
        //    var result = DataSourceLoader.Load(checkout, loadOptions);

        //        return Json(result);
        //    }

        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}

        [HttpGet]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            try
            {
                var record = _dbContext.Customer.Where(x => x.CustomerId == id).FirstOrDefault();
                _dbContext.Customer.Remove(record);
                _dbContext.SaveChanges();

                return Json(true);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet]
        public IActionResult CustomerDetails(Guid id)
        {
            try
            {
                string customerName = GetCustomerNameById(id);

                ViewBag.CustomerName = customerName;

                Console.WriteLine(ViewBag.CustomerName);

                return View();
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
            //return View();
        }

        private string GetCustomerNameById(Guid id)
        {
            try
            {
                var customer = _dbContext.Customer.FirstOrDefault(c => c.CustomerId == id);

                if (customer != null)
                {
                    return customer.CustomerName;
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving customer name: {ex.Message}");
                return string.Empty;
            }
        }



        [HttpGet]
        public IActionResult GetCustomerCheckGrid(DataSourceLoadOptions loadOptions, Guid id)
        {
            try
            {
                var query = from customer in _dbContext.Customer
                            join customersInRooms in _dbContext.CustomersInRooms on customer.CustomerId equals customersInRooms.CustomerIdFK
                            join room in _dbContext.Rooms on customersInRooms.RoomIdFK equals room.RoomId
                            where customer.CustomerId == id
                            select new
                            {
                                customer.CustomerId,
                                customer.CustomerName,
                                customer.MobileNo,
                                customer.Nationality,
                                customer.Gender,
                                customer.DateOfBirth,
                                customer.IdProof,
                                customer.Address,
                                customersInRooms.CheckIn,
                                customersInRooms.CheckOut,
                                customersInRooms.CustomersInRoomsId,
                                room.RoomId,
                                room.RoomNo,
                                room.RoomType,
                                room.Bed,
                                room.Price
                            };
             
                var customerData = query.ToList();

                return Json(customerData);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }



    }
}
