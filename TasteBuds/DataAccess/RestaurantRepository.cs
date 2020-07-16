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
            var sql = @$"insert into Restaurant(RestaurantId, Address, [Name], [Url], [Hours], PhoneNumber, AverageCostForTwo, ThumbNail, DateAdded)
                        output inserted.*
                        values(@RestaurantId, @Address, @Name, @Url, @Hours, @PhoneNumber, @AverageCostForTwo, @ThumbNail, '{DateTime.Now}')";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Restaurant>(sql, restaurantToAdd);
                return result;
            }
        }

        public IEnumerable<Restaurant> GetAllRestaurants()
        {
            var sql = @"select *
                        from Restaurant
                        order by DateAdded desc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurants = db.Query<Restaurant>(sql);
                return restaurants;
            }
        }

        public Restaurant GetSingleRestaurant(int restaurantId)
        {
            var sql = @"select *
                        from Restaurant
                        where RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurant = db.QueryFirstOrDefault<Restaurant>(sql, new { RestaurantId = restaurantId });
                return restaurant;
            }
        }

        public IEnumerable<Restaurant> RemoveRestaurant(int restaurantId)
        {
            var sql = @"delete
                        from Restaurant
                        where RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { RestaurantId = restaurantId });
                var restaurants = GetAllRestaurants();
                return restaurants;
            }
        }
    }
}
