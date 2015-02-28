// Manager for friends list
Template.friendsList.helpers({
    friends: function() {
	return Meteor.users.find({_id: {$ne: Meteor.userId()}});
    }
});
