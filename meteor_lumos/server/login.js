//TODO use Accounts.onLogin(function) for adding friends based on group id

// Accounts.onLogin(addFriends);


var findfriends = function findfriends() {
    if( !Meteor.user().profile ) {
	console.log("Creating profile sub-document")
	Meteor.user().update({},{$set:{"profile": {"groupid":"testgroup1", "friends":[]}}});
	return null
    } else if ( !Meteor.user().profile.friends ) {
	console.log("Creating friends sub-document")
	Meteor.user().update({},{$set:{"profile.groupid":"testgroup1", 
				       "profile.friends":[]}});
	return null
    } else {
	console.log("Returning friends")
	return Meteor.user().profile.friends;
    }
}
// TODO eleminate default groupid

// TODO if no friends add all with same groupid
// TODO make sure this works :)
function addFriends() {
    console.log("Adding friends")
    if (!findfriends()) {
	Meteor.users().find({"groupid" : Meteor.user().groupid}).forEach( function(friend) {
	    Meteor.user().update({},{$addToSet : {"profile.friends" : friend._id}}); 
	    // addToSet doesn't add duplicates
	});
    }
}

// Friends.find().forEach(function(user) {console.log(user.emails[0]);});

// TODO friends should be a embedded sub-document of users.profile
// TODO profile should be a embedded sub-document of users
// TODO make sure that friends can be added (manually? or by group id somehow?)
// TODO make sure that this does not add self as friend (verify on email)

// db.users.findOne({friends:{"$exists":true}})
// db.users.update({_id:"6ox2osiG4dcjirPbW"},{$set : {"groupid":"testgroup1"}})
