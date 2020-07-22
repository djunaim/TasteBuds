create table Friendship (
	FriendshipId int identity(1,1) primary key not null,
	UserId1 int foreign key references [User](UserId),
	UserId2 int foreign key references [User](UserId),
)