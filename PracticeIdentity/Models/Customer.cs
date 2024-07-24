using System.Numerics;

namespace PracticeIdentity.Models
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int MobileNo { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string IdProof { get; set; }
        public string Address { get; set; }


    }
}
