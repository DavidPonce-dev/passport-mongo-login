const express = require('express')
const engine = require('ejs-mate')
const session = require('express-session')
const morgan = require('morgan')
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')

const connectDB = require('./db')
const { secret } = require('./keys')

//inicializadores
const app = express();
require('./passport/local-auth')

app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', engine)

app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

//middlewares

app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(session({
    secret,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    next()
})

//routes

app.use('/', require('./routes/index'))

//run

app.listen(app.get('port'), async()=> {
    console.log('servidor corriendo en puerto:', app.get('port'))
    connectDB()
        .then(() => console.log('conectado a la DB'))
        .catch(err => console.error(err))
})