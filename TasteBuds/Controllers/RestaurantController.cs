using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteBuds.DataAccess;
using TasteBuds.Models;

namespace TasteBuds.Controllers
{
    [Route("api/tastebuds")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        RestaurantRepository _RestaurantRepository;
        public RestaurantController(RestaurantRepository restaurantRepository)
        {
            _RestaurantRepository = restaurantRepository;
        }

        [HttpGet("restaurants")]
        public IActionResult GetAllRestaurants()
        {
            var result = _RestaurantRepository.GetAllRestaurants();
            if (!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpPost("restaurant/addRestaurant")]
        public IActionResult AddRestaurant(Restaurant restaurantToAdd)
        {
            var restaurant = _RestaurantRepository.AddRestaurant(restaurantToAdd);
            return Ok(restaurant);
        }
    }
}