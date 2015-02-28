Meteor.publish('friends', function() {
    return Profiles.find({friends: {$in: [this.userId]}});
});

Meteor.publish('profile', function() {
    return Profiles.find({_id: this.userId});
});

Meteor.publish('crimes', function() {
    return Crimes.find();
});

// TODO we will generate accounts for everyone automatically
// TODO if no friends add all with same groupid
// TODO onlyu publish if friendship is mutual
// TODO publish profile,email,userid of user's friends
// TODO manaully add friends based on groupIDs
// TODO eliminate default groupid

// how to exclude fields
// Meteor.publish('allPosts', function(){ return Posts.find({}, {fields: {
// date: false }});
// });


// TODO friends should be a embedded sub-document of users.profile
// TODO make sure that friends can be added (manually? or by group id somehow?)
// TODO make sure that this does not add self as friend (verify on email)

// db.users.findOne({friends:{"$exists":true}})
// db.users.update({_id:"6ox2osiG4dcjirPbW"},{$set : {"groupid":"testgroup1"}})
