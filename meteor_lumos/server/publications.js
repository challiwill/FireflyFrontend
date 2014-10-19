Meteor.publish('friends', function() { 
    return Friends.find();
});

// Something like this but for friends, friends, etc
// Meteor.publish('posts', function(author) {
// return Posts.find({'flagged': false, 'author': author});
// });
//exclude fields
// Meteor.publish('allPosts', function(){ return Posts.find({}, {fields: {
// date: false }});
// });
