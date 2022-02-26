const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

const register = async (req, email, password, done) => {
    
    const user = await User.findOne({email})
    if (user) done(null, false, req.flash('signupMessage', 'el correo ya existe'))
    else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }
}

const login = async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
  }
  
passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, login));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, register))