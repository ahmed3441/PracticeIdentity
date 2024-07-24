using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PracticeIdentity.Data;
using PracticeIdentity.Migrations;
using PracticeIdentity.Models;

namespace PracticeIdentity.Controllers
{
    [Authorize]
    public class CustomersInRoomsController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomersInRoomsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost]
        public async Task <ActionResult> AlloteRoomToCustomer(Guid CustomerId, DateTime checkIn, DateTime? checkOut, Guid roomId)
        {
            try
            {
                var checkInOut = new CustomersInRooms
                {

                    CustomerIdFK = CustomerId,
                    CheckIn = checkIn,
                    //CheckOut = checkOut,
                    RoomIdFK = roomId
                };

                _dbContext.CustomersInRooms.Add(checkInOut);
                _dbContext.SaveChanges();

                //for rooms booked true
                var room = _dbContext.Rooms.Where(x => x.RoomId == roomId).FirstOrDefault();
                room.Booked = true;
    
                _dbContext.Rooms.Update(room);
                await _dbContext.SaveChangesAsync();


                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult> addCheckOut(Guid roomId, DateTime checkout, Guid cusInroom)//( DateTime? checkOut, Guid roomId, Guid customersInRoomsId)
        {
            try
            {

                var existingRecord = _dbContext.CustomersInRooms.FirstOrDefault(x => x.CustomersInRoomsId == cusInroom);
                if (existingRecord != null)
                {
                 
                    existingRecord.CheckOut = checkout;

                    await _dbContext.SaveChangesAsync();

                }

            
                var room = _dbContext.Rooms.Where(x => x.RoomId == roomId).FirstOrDefault();
                room.Booked = false;

                _dbContext.Rooms.Update(room);
                await _dbContext.SaveChangesAsync();


                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message });
            }
        }

    }
}
