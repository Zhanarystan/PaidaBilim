using System.Collections.Generic;
using API.DTO;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash {get;set;}
        public byte[] PasswordSalt { get; set; }
        public string FullName { get; set; }
    }
}