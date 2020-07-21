insert into UserRestaurant (UserId, RestaurantId)
output inserted.*
values(@UserId, @RestaurantId)

select *
from UserRestaurant

