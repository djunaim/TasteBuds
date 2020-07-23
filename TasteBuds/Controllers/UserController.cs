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

        [HttpGet("user/{userId}/restaurants")]
        public IActionResult GetUserWithRestaurants(int userId)
        {
            var result = _UserRepository.GetUserWithRestaurants(userId);
            if (result == null)
            {
                return NotFound("User does not have any restaurants saved.");
            }
            return Ok(result);
        }

        // Add Restaurant to User //
        [HttpPost("user/{userId}/restaurantAdd")] 
        public IActionResult AddRestaurant(int userId, UserRestaurant restaurantToAddToProfile)
        {
            var existingUserRestaurant = _UserRepository.GetSingleUserRestaurantByUserId(userId, restaurantToAddToProfile.RestaurantId);
            if (existingUserRestaurant == null)
            {
                var result = _UserRepository.AddRestaurantToProfile(restaurantToAddToProfile);
                return Ok(result);
            }
            return Ok(existingUserRestaurant);
        }

        [HttpDelete("user/{userId}/remove/{restaurantId}")]
        public IActionResult RemoveRestaurantFromProfile(int userId, int restaurantId)
        {
            var result = _UserRepository.RemoveRestaurantFromProfile(userId, restaurantId);
            return Ok(result);
        }

        [HttpGet("user/{userId}/userRestaurant/{restaurantId}")]
        public IActionResult GetSingleUserRestaurantByUserId(int userId, int restaurantId)
        {
            var result = _UserRepository.GetSingleUserRestaurantByUserId(userId, restaurantId);
            if (result == null)
            {
                return NotFound("That does not exist.");
            }

            return Ok(result);
        }

        // Add friends //
        [HttpPost("user/friendship/user/{userId}/friend/{friendId}")]
        public IActionResult AddFriend(int userId, int friendId)
        {
            var result = _UserRepository.AddFriend(userId, friendId);
            if (result == null)
            {
                return NotFound("UserId or FriendId does not exist");
            }
            return Ok(result);
        }

        // Get Friends //
        [HttpGet("user/friends")]
        public IActionResult GetFriends()
        {
            var result = _UserRepository.GetFriends();
            if (result == null)
            {
                return NotFound("No friends found");
            }
            return Ok(result);
        }
    }
}
