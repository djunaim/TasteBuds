using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasteBuds.Models
{
    public class Restaurant
    {
        public int RestaurantId { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Hours { get; set; }
        public string PhoneNumber { get; set; }
        public int AverageCostForTwo { get; set; }
        public string ThumbNail { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
