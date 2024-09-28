import mongoose from "mongoose";

const paymentschema = mongoose.Schema({

   Total_purchase:Number,
   paid:Number,
   Balance:Number,

   customer_ref:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'customers'
}


})

export const payment = mongoose.model('payment',paymentschema)