// Manager for Friends

Template.friendsList.helpers({ 
    friends: function() {
	return Friends.find(); 
    }
});
