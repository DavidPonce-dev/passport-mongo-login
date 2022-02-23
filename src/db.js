const mongoose = require('mongoose')
const { mongoDB } = require('./keys')

module.exports =  ()=> mongoose.connect(mongoDB.URI, {
    useNewUrlParser: true
})