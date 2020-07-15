create table Restaurant (
	RestaurantId int identity(1,1) primary key not null,
	Locations nvarchar(250) null,
	[Name] nvarchar(250) null,
	[Url] varchar(250) null,
	[Hours] varchar(250) null,
	PhoneNumber int null,
	AverageCostForTwo int null,
	ThumbNail varchar(250) null,
)