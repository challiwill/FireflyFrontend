from app import models, db
from app.models import User
import unittest


class TestCase(unittest.TestCase):
    def test_follow(self):
        u1 = User(name = "johnny", user_name = 'john', email = 'john@example.com', password = "apple")
        u2 = User(name = "susannah", user_name = 'susan', email = 'susan@example.com', password = "orange")
        db.session.add(u1)
        db.session.add(u2)
        db.session.commit()
        u = u1.request(u2)
        db.session.add(u)
        db.session.commit()
        assert u1.request(u2) == None
        assert u1.request_pending(u2)
        assert u2.request_pending(u1)
        assert u1.requested.count() == 1
        assert u1.requested.first().user_name == 'susan'
        assert u2.requests.count() == 1
        assert u2.requests.first().user_name == 'john'
        db.session.delete(u)
        db.session.delete(u2)
        db.session.delete(u1)
        db.session.commit()


if __name__ == "__main__":
    unittest.main()
 