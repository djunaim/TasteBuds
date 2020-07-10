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
    }
}
