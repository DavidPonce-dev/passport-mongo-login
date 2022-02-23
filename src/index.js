const express = require('express')
const engine = require('ejs-mate')
const morgan = require('morgan')
const connectDB = require('./db')
const path = require('path')
const app = express();

app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', engine)

app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

//middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

//routes

app.use('/', require('./routes/index'))

app.listen(app.get('port'), async()=> {
    console.log('servidor corriendo en puerto: ', app.get('port'))
    connectDB
        .then(() => console.log('conectado a la DB'))
        .catch(err => console.error(err))
})