using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using TasteBuds.Models;
using Dapper;
using System.Data.SqlClient;

namespace TasteBuds.DataAccess
{
    public class UserRepository
    {
        string ConnectionString;
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TasteBuds");
        }

        public User GetSingleUser(string email)
        {
            var sql = @"select *
                        from [User]
                        where email=@email";

            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(sql, new { email = email });
                return user;
            }
        }

        public UserRestaurant AddRestaurantToProfile(UserRestaurant restaurantToAddToProfile)
        {
            var sql = @"insert into UserRestaurant (UserId, RestaurantId)
                        output inserted.*
                        values(@UserId, @RestaurantId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<UserRestaurant>(sql, restaurantToAddToProfile);
                return result;
            }
        }
        public IEnumerable<UserRestaurant> GetAllUserRestaurantsByUserId(int userId)
        {
            var sql = @"select *
                        from UserRestaurant
                        where UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var userRestaurants = db.Query<UserRestaurant>(sql, new { UserId = userId });
                return userRestaurants;
            }
        }

        public UserWithRestaurantList GetUserWithRestaurants(int userId)
        {
            var restaurantSql = @"select *
                                from Restaurant
                                order by DateAdded desc";

            var userRes = @"select *
                            from UserRestaurant
                            where UserId = @userId";

            var userSql = @"select *
                            from [User]
                            where UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var restaurants = db.Query<Restaurant>(restaurantSql);
                var userRestaurants = db.Query<UserRestaurant>(userRes, new { UserId = userId });
                var user = db.QueryFirstOrDefault<UserWithRestaurantList>(userSql, new { UserId = userId });
                var restaurantList = new List<Restaurant>();

                foreach (var restaurant in restaurants)
                {
                    foreach (var userRestaurant in userRestaurants)
                    {
                        if (restaurant.RestaurantId == userRestaurant.RestaurantId)
                        {
                            restaurantList.Add(restaurant);
                        }
                    }
                }

                user.Restaurants = restaurantList;
                return user;
            }
        }

        public UserRestaurant GetSingleUserRestaurantByUserId(int userId, int restaurantId)
        {
            var sql = @"select *
                        from UserRestaurant
                        where UserId = @userId and RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var userRestaurant = db.QueryFirstOrDefault<UserRestaurant>(sql, new { UserId = userId, RestaurantId = restaurantId });
                return userRestaurant;
            }
        }

        public IEnumerable<UserRestaurant> RemoveRestaurantFromProfile(int userId, int restaurantId)
        {
            var sql = @"delete
                        from UserRestaurant
                        where RestaurantId = @restaurantId and UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { RestaurantId = restaurantId, UserId = userId });
                var userRestaurants = GetAllUserRestaurantsByUserId(userId);
                return userRestaurants;
            }
        }

        public User GetSingleUserById(int userId)
        {
            var sql = @"select *
                        from [User]
                        where UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(sql, new { UserId = userId });
                return user;
            }
        }

        public Friendship AddFriend(int userId, int friendId)
        {
            var sql = @"insert into Friendship (UserId1, UserId2)
                        output inserted.*
                        values (@UserId1, @UserId2)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    UserId1 = userId,
                    UserId2 = friendId,
                };

                var result = db.QueryFirstOrDefault<Friendship>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<UserName> GetFriends()
        {
            var sql = @"select FirstName, LastName, FriendshipId
                        from Friendship
	                        join [User]
	                        on Friendship.UserId2 = [User].UserId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.Query<UserName>(sql);
                return result;
            }
        }
    }
}
