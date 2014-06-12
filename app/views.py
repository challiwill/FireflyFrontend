from app import app, db
from flask import render_template, request, url_for, flash, redirect, session
from app.models import User, YES, NO
from wtforms import Form, BooleanField, FileField, TextField, TextAreaField, PasswordField, validators, SelectField
from hashlib import md5
from werkzeug.routing import BaseConverter
from werkzeug import secure_filename
import os



class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app.url_map.converters['regex'] = RegexConverter
MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


@app.route('/')
def index():
    return render_template('index.html', logged_in=session.get('logged_in'))


@app.route('/home/')
def home():
    user = User.query.filter_by(id=session.get('user_id'))
    if session.get('logged_in') and user.first():
        user = user[0]
        return render_template('home.html', user=user, logged_in=session.get('logged_in'))
    else:
        return redirect(url_for('login'))

@app.route('/home/edit', methods=['GET', 'POST'])
def edit_profile():
    user = User.query.filter_by(id=session.get('user_id'))
    if session.get('logged_in') and user.first():
        user = user[0]
        form = RegistrationForm()
        if request.method == 'POST' and form.validate():
            user.name=form.name.data
            user.user_name=form.user_name.data
            user.email=form.email.data
            flash("Changes successfully made")
            return redirect(url_for('home'))
        else:
            form.name.data = user.name
            form.user_name.data=user.user_name
            form.email.data=user.email
        return render_template('edit_profile.html', form=form, logged_in=session.get('logged_in'))
    else:
        return redirect(url('login'))


@app.route('/create/', methods=['POST', 'GET'])
def create():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        un = User.query.filter_by(user_name=form.user_name.data)
        e = User.query.filter_by(email=form.email.data)
        if un.first() or e.first():
            flash("We already have that username or email.")
        elif " " in form.user_name.data:
            flash("No spaces allowed in your username")
        else:
            user = User(name=form.name.data, user_name=form.user_name.data, 
                        email=form.email.data, password=md5(form.password.data).hexdigest())
            db.session.add(user)
            db.session.commit()
            flash('Thanks for registering')
            return redirect(url_for('index'))
    return render_template('create.html', active="create", form=form, logged_in=session.get('logged_in'))



@app.route('/login/', methods=['POST', 'GET'])
def login():
    form = LoginForm(request.form)

    if session.get('logged_in'):
        logged_in = True
    else:
        logged_in = False

    if request.method=='POST' and form.validate():
        
        #Returns a list of users, should be one.
        user = db.session.query(User).filter_by(email = form.email.data, password = md5(form.password.data).hexdigest() )
        
        # If user exists
        if user.first():
            user = user[0]
            flash(u'Successfully logged in as %s' % user.name)
            auth_user(user.id)
            return redirect(url_for('home'))
        else:
            flash("Incorrect username and password")
    return render_template('login.html', form=form, logged_in=session.get('logged_in'))

@app.route('/logout/')
def logout():
    session['logged_in'] = False
    session.clear()
    flash("You've been logged out")
    return redirect('/')


@app.route('/<regex("[A-Za-z0-9-_.]{4,20}"):uname>/')
def user_page(uname):
    user = db.session.query(User).filter_by(user_name = uname)
    if user.first():
        user = user[0]
        return render_template('user.html', user=user, logged_in=session.get('logged_in'), me=session.get('user_id'))
    else:
        return render_template('error.html'), 404


@app.route('/<regex(".+"):url>')
def error():
    return render_template('error.html')

class RegistrationForm(Form):
    name = TextField('Name', [validators.Length(min=4, max=25)])
    user_name = TextField('User name', [validators.Length(min=4, max=20)])
    email = TextField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.Required(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    accept_tos = BooleanField('I accept the TOS', [validators.Required()])






class LoginForm(Form):
    email = TextField('Email', [validators.Required()])
    password = PasswordField('Password', [validators.Required()])

def auth_user(user_id):
    session['user_id'] = user_id
    session['logged_in'] = True



