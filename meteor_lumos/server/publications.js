Meteor.publish('friends', function() {
    return Meteor.users.find({friends: {$in: [this.userId]}});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
			     {fields: {'friends': true, 'profile': true}});
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
