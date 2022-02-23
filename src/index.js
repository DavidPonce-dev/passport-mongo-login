const express = require('express')
const engine = require('ejs-mate')
const path = require('path')
const app = express();

app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', engine)

app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

//routes

app.use('/', require('./routes/index'))


app.listen(app.get('port'), ()=> {
    console.log('servidor corriendo en puerto: ', app.get('port'))
})