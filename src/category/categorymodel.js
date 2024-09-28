import mongoose from "mongoose";

const categoryschema = mongoose.Schema({

           categoryname:String

}) 
export const category = mongoose.model('category',categoryschema)