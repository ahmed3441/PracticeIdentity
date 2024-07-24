using System.Numerics;

namespace PracticeIdentity.Models
{
    public class Rooms
    {
        public Guid RoomId { get; set; }
        public string RoomNo { get; set; }
        public string RoomType { get; set; }
        public string Bed { get; set; }
        public int Price { get; set; }
        public bool Booked { get; set; }

    }
}
