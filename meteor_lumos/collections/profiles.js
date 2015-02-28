Profiles = new Meteor.Collection('profiles');

Profiles.allow({
    update: function(userId, profile) { return ownProfile(userId, profile); }
});
