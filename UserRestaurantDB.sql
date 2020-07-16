create Table UserRestaurant (
	UserRestaurantId int identity(1,1) primary key not null,
	UserId int foreign key references [User](UserId) not null,
	RestaurantId int foreign key references Restaurant(RestaurantId) not null,
)