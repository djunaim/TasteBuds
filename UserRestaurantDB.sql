create Table UserRestaurant (
	UserRestaurantId int identity(1,1) primary key not null,
	UserId int foreign key references [User](UserId) not null,
	RestaurantId int foreign key references Restaurant(RestaurantId) not null,
)

insert into UserRestaurant (UserId, RestaurantId)
values (2, 17838043),
		(2, 6401481),
		(3, 17838043),
		(3, 6400282),
		(4, 17194668),
		(4, 6401481),
		(4, 17955135),
		(5, 16728262),
		(5, 17194353)