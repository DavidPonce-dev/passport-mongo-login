const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

const register = async (req, email, password, done) => {
    
    const user =  User.findOne({email})
    if (user) return done(null, false, req.flash('signupMessage', 'el correo ya existe'))
    
    const newUser = new User()
    newUser.email = email
    newUser.password = user.encryptPassword(password)
    await user.save()
    done(null, user)
}

passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, register))