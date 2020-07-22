insert into Restaurant(RestaurantId, Locations, [Name], [Url], [Hours], PhoneNumber, AverageCostForTwo, ThumbNail)
output inserted.*
values(@RestaurantId, @Locations, @Name, @Url, @Hours, @PhoneNumber, @AverageCostForTwo, @ThumbNail)