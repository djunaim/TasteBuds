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

        public RestaurantWithUsers GetSingleRestaurant(int restaurantId)
        {
            var sql = @"select *
                        from Restaurant
                        where RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurant = db.QueryFirstOrDefault<RestaurantWithUsers>(sql, new { RestaurantId = restaurantId });
                return restaurant;
            }
        }

        public RestaurantWithUsers GetSingleRestaurantWithUsers(int restaurantId)
        {
            var restaurantSql = @"select *
                                from Restaurant
                                where RestaurantId = @restaurantId";

            var userRes = @"select *
                            from UserRestaurant
                            where RestaurantId = @restaurantId";

            var usersSql = @"select *
                            from [User]
	                            join Friendship
	                            on [User].UserId = Friendship.UserId2";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurant = db.QueryFirstOrDefault<RestaurantWithUsers>(restaurantSql, new { RestaurantId = restaurantId });
                var userRestaurants = db.Query<UserRestaurant>(userRes, new { RestaurantId = restaurantId });
                var users = db.Query<User>(usersSql);
                var friendsList = new List<User>();

                if (restaurant == null)
                {
                    var singleRestaurant = GetSingleRestaurant(restaurantId);
                    return singleRestaurant;
                }
                else
                {
                    foreach (var userRestaurant in userRestaurants)
                    {
                        foreach (var user in users)
                        {
                            if (userRestaurant.UserId == user.UserId)
                            {
                                friendsList.Add(user);
                            }
                        }
                    }
                    restaurant.Friends = friendsList;
                    return restaurant;
                }


            }
        }

        public List<Restaurant> GetRestaurantRecsForUser1()
        {
            var restaurantSql = @"select *
                                from Restaurant";

            var otherUserResSql = @"select distinct RestaurantId
                                    from UserRestaurant
                                    where UserId != 1";

            var userRes1Sql = @"select distinct RestaurantId
                                from UserRestaurant
                                where UserId = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurants = db.Query<Restaurant>(restaurantSql);
                var userRestaurantsNotUser1 = db.Query<UserRestaurant>(otherUserResSql);
                var user1UserRestaurants = db.Query<UserRestaurant>(userRes1Sql);

                var restaurantsList = restaurants.Where(r => user1UserRestaurants.All(uR1 => uR1.RestaurantId != r.RestaurantId)).ToList();
                
                return restaurantsList;
                
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
