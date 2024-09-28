import mongoose from "mongoose";
const laptopSchema = mongoose.Schema(
    {
        brandname:String,
        modelno:String,
        price:Number,

        category_ref:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }

   

}
)
export const laptop=mongoose.model('laptop',laptopSchema)