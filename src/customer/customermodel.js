import mongoose from "mongoose";

const customer_schema = mongoose.Schema({
    
    customername:String,
    companyname:String,
    address:String,
    email:String,
    phonenumber:Number,

})

export const customers = mongoose.model('customer',customer_schema)