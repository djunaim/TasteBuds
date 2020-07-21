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
        public IEnumerable<UserRestaurant> GetAllUserRestaurants()
        {
            var sql = @"select *
                        from UserRestaurant";

            using (var db = new SqlConnection(ConnectionString))
            {
                var userRestaurants = db.Query<UserRestaurant>(sql);
                return userRestaurants;
            }
        }

        public UserRestaurant GetSingleUserRestaurant(int restaurantId)
        {
            var sql = @"select *
                        from UserRestaurant
                        where RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var userRestaurant = db.QueryFirstOrDefault<UserRestaurant>(sql, new { RestaurantId = restaurantId });
                return userRestaurant;
            }
        }

        public IEnumerable<UserRestaurant> RemoveRestaurantFromProfile(int restaurantId)
        {
            var sql = @"delete
                        from UserRestaurant
                        where RestaurantId = @restaurantId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { RestaurantId = restaurantId });
                var userRestaurants = GetAllUserRestaurants();
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

        public User AddFriend(int userId, int friendId)
        {
            var user = GetSingleUserById(userId);
            var friend = GetSingleUserById(friendId);
            user.Friends.Add(friend);
            return user;
        }
    }
}
