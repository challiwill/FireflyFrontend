ownProfile = function(userId, doc) {
    return doc && doc._id === userId;
}
