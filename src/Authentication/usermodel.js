import mongoose from "mongoose";

const userschema = mongoose.Schema({


   username:{
    type:String,
    required:true
   },

   password :{
    type:String,
    required:true
   },

   firstname:String,

   lastname:String,

   joined_date:Date,

   birth_date : Date,
   
   admin:{
    type:Boolean,
    required:true
   },

   manager:{
    type:Boolean,
    required:true
   },

   team_leader :{

    type:Boolean,
    required:true
   },
   employee :{

    type:Boolean,
    required:true
   },

},{
      timestamps:true

}

)
export const user =mongoose.model('user' ,userschema)


const RefreshTokenSchema = mongoose.Schema(
      {
            refresh_token:{
                   
                  type:String,
                  required:true

            }
      }
)

export const RefreshToken = mongoose.model('refreshtoken',RefreshTokenSchema)