from app import models, db
from app.models import User

def print_all_users():
    users = User.query.all()
    for u in users:
        if u:
            print u.id, u.name, u.email, u.user_name, u.password, u.requested.count()



# def print_all_projects():
#     projects = Project.query.all()
#     for p in projects:
#         if p:
#             print p.id, p.name, p.author.name

# def remove_samir():
#     results = db.session.query(models.User).filter_by(email="makhani@berkeley.edu").all()
#     if len(results) > 0:
#         samir = results[0]
#         db.session.delete(samir)
#         samir_classes = db.session.query(models.Classes).filter_by(user_id=samir.id).all()
#         for one_class in samir_classes:
#             db.session.delete(one_class)
#         db.session.commit()
#         print "samir has been deleted"


print "==================USERS=================="
print_all_users()
# print "=================Projects================="
# print_all_projects()

