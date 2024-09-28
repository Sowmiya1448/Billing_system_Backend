import mongoose from "mongoose";
import { laptop } from "../laptops/laptoModel.js";

const stockschema = mongoose.Schema({

   laptop_reference:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'laptop',
        required:true
    },

    category_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },

    stocklist:Number

 })

export const stock = mongoose.model('stockmodel',stockschema)