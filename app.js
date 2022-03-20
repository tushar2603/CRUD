const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/StigeMongoDb'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', ()=>{
    console.log('Connected..!');
})

app.use(express.json())

const taskRouter = require('./routes/tasks')
app.use('/tasks',taskRouter)

app.listen(9000, ()=>{
    console.log('Server started');
})