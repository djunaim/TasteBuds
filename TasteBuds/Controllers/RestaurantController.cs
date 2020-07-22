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
            var existingRestaurant = _RestaurantRepository.GetSingleRestaurant(restaurantToAdd.RestaurantId);
            if (existingRestaurant == null)
            {
                var restaurant = _RestaurantRepository.AddRestaurant(restaurantToAdd);
                return Ok(restaurant);
            }
            return Ok(existingRestaurant);
        }

        [HttpGet("restaurant/{restaurantId}")]
        public IActionResult GetSingleRestaurant(int restaurantId)
        {
            var result = _RestaurantRepository.GetSingleRestaurant(restaurantId);
            if (result == null)
            {
                return NotFound("That restaurant does not exist.");
            }

            return Ok(result);
        }

        // Get Single Restaurant With Users //
        [HttpGet("restaurant/{restaurantId}/friends")]
        public IActionResult GetSingleRestaurantWithUsers(int restaurantId)
        {
            var result = _RestaurantRepository.GetSingleRestaurantWithUsers(restaurantId);
            if (result == null)
            {
                return NotFound("That restaurant does not exist");
            }
            return Ok(result);
        }

        [HttpDelete("restaurant/remove/{restaurantId}")]
        public IActionResult RemoveRestaurant(int restaurantId)
        {
            var restaurant = _RestaurantRepository.RemoveRestaurant(restaurantId);
            return Ok(restaurant);
        }
    }
}