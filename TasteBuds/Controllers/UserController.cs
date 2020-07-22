using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TasteBuds.DataAccess;
using TasteBuds.Models;

namespace TasteBuds.Controllers
{
    [Route("api/tastebuds")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _UserRepository;
        public UserController(UserRepository userRepository)
        {
            _UserRepository = userRepository;
        }

        // Get one user //
        [HttpGet("user/email/{email}")]
        public IActionResult GetSingleUser(string email)
        {
            var result = _UserRepository.GetSingleUser(email);
            if (result == null)
            {
                return NotFound("User doesn't exist");
            }
            return Ok(result);
        }

        // Add Restaurant to User //
        [HttpPost("user/restaurantAdd")] 
        public IActionResult AddRestaurant(UserRestaurant restaurantToAddToProfile)
        {
            var existingUserRestaurant = _UserRepository.GetSingleUserRestaurant(restaurantToAddToProfile.RestaurantId);
            if (existingUserRestaurant == null)
            {
                var result = _UserRepository.AddRestaurantToProfile(restaurantToAddToProfile);
                return Ok(result);
            }
            return Ok(existingUserRestaurant);
        }

        [HttpDelete("user/remove/{restaurantId}")]
        public IActionResult RemoveRestaurantFromProfile(int restaurantId)
        {
            var result = _UserRepository.RemoveRestaurantFromProfile(restaurantId);
            return Ok(result);
        }

        [HttpGet("user/userRestaurant/{restaurantId}")]
        public IActionResult GetSingleUserRestaurant(int restaurantId)
        {
            var result = _UserRepository.GetSingleUserRestaurant(restaurantId);
            if (result == null)
            {
                return NotFound("That does not exist.");
            }

            return Ok(result);
        }

        // Add friends //
        [HttpPost("user/friendship/user/{userId}/friend/{friendId}")]
        public IActionResult AddFriend (int userId, int friendId)
        {
            var result = _UserRepository.AddFriend(userId, friendId);
            if (result == null)
            {
                return NotFound("UserId or FriendId does not exist");
            }
            return Ok(result);
        }
    }
}
