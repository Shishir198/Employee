const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./model')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")
// bCfXLH9NhGZW27z3
// ZNNpQtfi6kM20v7H
// ROP65xJlPMIx7t0f............retryWrites=true&w=majority
const mongoUri = "mongodb://mongoish:ZNNpQtfi6kM20v7H@clusterish-shard-00-00-f21y4.mongodb.net:27017,clusterish-shard-00-01-f21y4.mongodb.net:27017,clusterish-shard-00-02-f21y4.mongodb.net:27017/test?ssl=true&replicaSet=clusterish-shard-0&authSource=admin&retryWrites=true"
// const mongoUri = ""
mongoose.connect(mongoUri,{
    useNewUrlParser : true,
    useUnifiedTopology: true
})


mongoose.connection.on("connected",() => {
    console.log("conected")
})


mongoose.connection.on("error",(err) => {
    console.log("error",err)
})


app.get('/',(req,res) =>{
    Employee.find({})
    .then(data =>{
        res.send(data)
    })
    // res.send("working")
    
    
})
app.post('/send-data',(req,res) =>{
    const employee = new Employee({
        "Name":req.body.Name,
        "email":req.body.email,
        "des":req.body.pos,
        "url" : req.body.url,
        "salary":req.body.salary,
        "Phone":req.body.Phone
       
    })
    employee.save()
    .then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => console.log(err))
    
})
app.post('/delete',(req,res) =>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data) 
    })
    .catch(err => console.log(err))
})
app.post('/update',(req,res) =>{
    Employee.findByIdAndUpdate(req.body.id,{
        "name":req.body.name,
        "email":req.body.email,
        "des":req.body.pos,
        "url" : req.body.url,
        "salary":req.body.salary,
        "phone":req.body.phone

    })
    .then(data => {
        console.log(data)
        res.send(data) 
    })
    .catch(err => console.log(err))
})

app.listen(3000,() => console.log("running"))




       