import mongoose from "mongoose";
import { laptop } from "../laptops/laptoModel.js";

const Billschema = mongoose.Schema({

          billno:{
             type:String,
             required:true
            },

            bill_date:{
                
               type:Date,
                required:true
            },

            customer_ref:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'customers'
            },

            bill_status:{
               type:String,
               default:'unpaid'

            },

            bill_amount:Number,

        })

  export const Bill = mongoose.model('bill',Billschema)     
  
  const BillProductSchema = mongoose.Schema(
    {
        laptop_reference:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'laptop'
        },

       bill_referece:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Bill'

       },

       quantity:{
         
          type:Number,
           required:true
       },

       amount:{
        type:Number, 
        required:true
       },

       gst:{
            type:Number,
            required:true
       },

     gst_amount:{

        type:Number,
        required:true
     },

     sub_total:{
        type:Number,
        required:true
     }


    }
  )

  export const Billproduct =mongoose.model('bill_product',BillProductSchema)