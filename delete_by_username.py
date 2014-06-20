from app import models, db
from app.models import User
import sys
from hashlib import md5

def delete_user(user_name):
	user = db.session.query(User).filter_by(user_name = user_name)
	if user.first():
		user = user[0]
		db.session.delete(user)
		db.session.commit()

def helper(help):
	if help == "help":
		print "username"
		return True
	return False

if helper(sys.argv[1]):
	bob = 2
else:
	delete_user(sys.argv[1])
