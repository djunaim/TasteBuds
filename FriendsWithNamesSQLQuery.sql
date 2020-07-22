select FirstName, LastName
from Friendship
	join [User]
	on Friendship.UserId2 = [User].UserId
