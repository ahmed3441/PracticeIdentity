using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using PracticeIdentity.Data;
using PracticeIdentity.Models;
using System.Net;
using System.Net.Http;
using System.Text;

namespace PracticeIdentity.Controllers
{
    [Authorize]
    public class RoomController : Controller
       
    {
        private readonly ApplicationDbContext _dbContext; 
        public RoomController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult AddRoom()
        {
            return View();
        }

        [HttpPost]
        public async Task <ActionResult> AddRoom(RoomsViewModel roomsViewModel)
        {
            try { 
            var rooms = new Rooms()
            {
                RoomNo = roomsViewModel.RoomNo,
                RoomType = roomsViewModel.RoomType,
                Bed = roomsViewModel.Bed,
                Price = roomsViewModel.Price,
            };
            await _dbContext.Rooms.AddAsync(rooms);
            await _dbContext.SaveChangesAsync();

            return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IActionResult GetRooms(DataSourceLoadOptions loadOptions)
        {
            try { 
            var rooms = _dbContext.Rooms.Select(x => new {x.RoomId, x.RoomNo, x.Price, x.Bed, x.RoomType, x.Booked}).ToList();
            var result = DataSourceLoader.Load(rooms, loadOptions);

            return Json(result);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPut]
        public async Task<JsonResult> UpdateRooms(Rooms model)
        {
            try { 
            var record = _dbContext.Rooms.Where(x=>x.RoomId==model.RoomId).FirstOrDefault();
            record.RoomNo=model.RoomNo;
            record.RoomType=model.RoomType;
            record.Price=model.Price;
            record.Bed=model.Bed;
            _dbContext.Rooms.Update(record);
            await _dbContext.SaveChangesAsync();

            return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetRoomById(Guid id)
        {
            try { 
            var room = _dbContext.Rooms.Where(x => x.RoomId == id).FirstOrDefault();

            return Json(room);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> DeleteRoom(Guid id)
        {
            try { 
            var record = _dbContext.Rooms.Where(x=>x.RoomId == id).FirstOrDefault();
             _dbContext.Rooms.Remove(record);
             _dbContext.SaveChanges();

            return Json(true);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomByType(string bedType, string roomType)
        {
            try { 
            var availableRooms = _dbContext.Rooms.AsQueryable()
                .Where(room => room.Booked == false && room.Bed == bedType && room.RoomType == roomType)
                 .Select(room => new { DisplayValue = room.RoomNo, Value = room.RoomId })
                .ToList();

            return Json(new { rooms = availableRooms});
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomPrice(Guid roomNo)
        {
            try { 
            var selecteRoomPrices = _dbContext.Rooms.AsQueryable()
                .Where(room => room.Booked == false && room.RoomId == roomNo)
                .Select(room => room.Price)
                .FirstOrDefault();

            return Json(new { prices = selecteRoomPrices });
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}

