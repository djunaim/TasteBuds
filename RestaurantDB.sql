create table Restaurant (
	RestaurantId int primary key not null,
	[Address] nvarchar(250) null,
	[Name] nvarchar(250) null,
	[Url] varchar(250) null,
	[Hours] varchar(250) null,
	PhoneNumber nvarchar(250) null,
	AverageCostForTwo int null,
	ThumbNail varchar(250) null,
)

alter table Restaurant
add DateAdded datetime

update Restaurant
set DateAdded = '7/1/2020'
where RestaurantId = 16862034

update Restaurant
set DateAdded = '6/30/2020'
where RestaurantId = 16865331

update Restaurant
set DateAdded = '6/15/2020'
where RestaurantId = 17195317


update Restaurant
set DateAdded = '4/10/2020'
where RestaurantId = 17765423
