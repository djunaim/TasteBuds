insert into Friendship (UserId1, UserId2)
output inserted.*
values (@UserId1, @UserId2)

select *
from Friendship