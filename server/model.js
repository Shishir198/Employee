const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    // name:"Iron Man",salary:"8lpa",des:"pos",phone:"123",email:"abcd@abcd.com",url
    Name:String,
    salary:String,
    des:String,
    Phone:String,
    email:String,
    url:String,

})

mongoose.model("employee",EmployeeSchema)