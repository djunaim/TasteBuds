using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TasteBuds.Models;

namespace TasteBuds.DataAccess
{
    public class RestaurantRepository
    {
        string ConnectionString;
        public RestaurantRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TasteBuds");
        }

        public Restaurant AddRestaurant(Restaurant restaurantToAdd)
        {
            var sql = @"insert into Restaurant(RestaurantId, Address, [Name], [Url], [Hours], PhoneNumber, AverageCostForTwo, ThumbNail)
                        output inserted.*
                        values(@RestaurantId, @Address, @Name, @Url, @Hours, @PhoneNumber, @AverageCostForTwo, @ThumbNail)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Restaurant>(sql, restaurantToAdd);
                return result;
            }
        }
    }
}
