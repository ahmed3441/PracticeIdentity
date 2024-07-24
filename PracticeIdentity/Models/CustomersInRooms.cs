namespace PracticeIdentity.Models
{
    public class CustomersInRooms
    {
        public Guid CustomersInRoomsId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public Guid RoomIdFK { get; set; }
        public Guid CustomerIdFK { get; set; }
    }
}
