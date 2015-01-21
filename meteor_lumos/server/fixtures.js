// TODO friends should be a embedded sub-document of users.profile
// TODO make sure that friends can be added (manually? or by group id somehow?)
// TODO make sure that this does not add self as friend (verify on email)

// db.users.findOne({friends:{"$exists":true}})
// db.users.update({_id:"6ox2osiG4dcjirPbW"},{$set : {"groupid":"testgroup1"}})
