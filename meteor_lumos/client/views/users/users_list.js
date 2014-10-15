// Manager for Users

Template.usersList.helpers({ 
    users: function() {
	return Users.find(); 
    }
});
