using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasteBuds.Models
{
    public class UserRestaurant
    {
        public int UserRestaurantId { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
    }
}
