using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasteBuds.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    public class UserName
    {
        public int FriendshipId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UserWithRestaurantList
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<Restaurant> Restaurants { get; set; }
    }
}
