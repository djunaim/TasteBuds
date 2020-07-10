create table [User] (
	UserId int identity(1,1) primary key not null,
	FirstName varchar(250) not null,
	LastName varchar(250) not null,
	Email varchar(320) not null
)

insert into [User] (FirstName, LastName, Email)
values ('Monica', 'Djunaidi', 'modjun12@gmail.com')

select *
from [User]