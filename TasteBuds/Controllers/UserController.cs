﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TasteBuds.DataAccess;

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
    }
}