if (Users.find().count() == 0) {
    Users.insert({
	name: 'Corbin Halliwill',
	uid: 1});
    Users.insert({
	name: 'Justin Halliwill',
	uid: 0});
}
