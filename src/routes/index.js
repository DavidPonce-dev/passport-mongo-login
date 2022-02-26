const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/signin', (req, res)=>{
    res.render('signin')    
})

router.post('/signin',  passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/profile', (req, res)=>{
    res.render('profile')
})

module.exports = router