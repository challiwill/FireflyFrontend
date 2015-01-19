// Something like this but for friends, friends, etc
// Meteor.publish('posts', function(author) {
// return Posts.find({'flagged': false, 'author': author});
// });

//exclude fields
// Meteor.publish('allPosts', function(){ return Posts.find({}, {fields: {
// date: false }});
// });

Meteor.publish('friends', function() {
    return Meteor.users.find({friends: {$in: [this.userId]}});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
			     {fields: {'friends': true, 'profile': true}});
});

// TODO onlyu publish if friendship is mutual
// TODO publish profile,email,userid of user's friends
// TODO manaully add friends based on groupIDs
