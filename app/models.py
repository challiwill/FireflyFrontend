from app import db

YES = 1
NO = 0

requests = db.Table("requests",
    db.Column("requestor_id", db.Integer, db.ForeignKey("user.id")),
    db.Column("requested_id", db.Integer, db.ForeignKey("user.id")))

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    user_name = db.Column(db.String(64))
    email = db.Column(db.String(120), unique = True)
    password = db.Column(db.String(64))
    requested = db.relationship("User",
        secondary = requests,
        primaryjoin = (requests.c.requestor_id == id),
        secondaryjoin = (requests.c.requested_id == id),
        backref = db.backref("requests", lazy = "dynamic"),
        lazy = "dynamic"
    )
    #groups = db.relationship('Group', backref = 'owner', lazy = 'dynamic')

    
    def request(self, user):
        if not self.is_requesting(user):
            self.requested.append(user)
            return self

    def is_requesting(self, user):
        return self.requested.filter(requests.c.requested_id == user.id).count() > 0

    @property
    def short_url(self):
        return libraries.short_url.encode_url(self.id)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def __repr__(self):
        return '<User %r>' % (self.name)






