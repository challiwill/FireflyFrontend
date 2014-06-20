from app import models, db
from app.models import User
import sys
from hashlib import md5

def make_user(name, email, username, password):
	user = User(name=name, email=email, user_name=username, password=password)
	db.session.add(user)
	db.session.commit()

def helper(help):
	if help == "help":
		print "name, email, username, password"
		return True
	return False

if helper(sys.argv[1]):
	bob = 2
else:
	make_user(sys.argv[1], sys.argv[2], sys.argv[3],  md5(sys.argv[4]).hexdigest())
