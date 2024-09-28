import express from 'express'
import { Bill } from './ordermodel.js'
import { Billproduct } from './ordermodel.js'
import { laptop } from "../laptops/laptoModel.js";
import { stock} from '../stock/stockmodel.js';


const billRouter = express.Router()


billRouter.get('/all', async (request, response) => {

    const all_bill = await Bill.find({})

    let all_data = []

    for (let bill of all_bill) {

        const products_to_bill = await Billproduct.find({ 'bill_referece': bill._id })

        let single_data = {

            bill_data: bill,
            product_data: products_to_bill

        }

        all_data.push(single_data)
    }

    response.json(all_data)
})



billRouter.get('/:id', async (request, response) => {

    const { id } = request.params

    const bill = await Bill.findById(id)

    const products_to_bill = await Billproduct.find({ 'bill_referece': id })


    let single_data = {

        bill_data: bill,
        product_data: products_to_bill

    }

    response.json(single_data)


})

const calculations =async(billdetails,billproducts) =>{

    const newbill = new Bill(billdetails)

    await newbill.save()

    let grandtotal = 0

    for (let product of billproducts) {


        let laptops = await laptop.findById(product.laptop_reference)
        
        let amount = Number(product.quantity) * Number(laptops.price)

        let gstamount = (amount * Number(product.gst)) / 100

        let subtotal = amount + gstamount

        grandtotal = grandtotal + subtotal

        const new_bill_product = new Billproduct({

            laptop_reference: product.laptop_reference,
            bill_referece: newbill._id,
            quantity: product.quantity,
            amount: amount,
            gst: product.gst,
            gst_amount: gstamount,
            sub_total: subtotal,

        }
        )
        await new_bill_product.save()
    }

    await Bill.findByIdAndUpdate(newbill._id, { bill_amount: grandtotal })
}


billRouter.post('/add', async (request, response) => {

    // console.log(request.body)

    const billdetails = request.body[0]
    const billproducts = request.body[1]

   await calculations(billdetails,billproducts)

   response.json({ message: "data received" })

})


billRouter.patch('/:id', async (request, response) => {

    const { id } = request.params

    const billdetails = request.body[0]
    const billproducts = request.body[1]

    await Bill.findByIdAndUpdate(id, billdetails)

    let grandtotal = 0

   for (let product of billproducts) {

        if (product.new === true)
       {


        let stockdata = await stock.findOne({laptop_reference:product.laptop_reference})


        await stock.findByIdAndUpdate(stockdata._id,{stocklist:stockdata.stocklist - product.quantity}) 


            let laptops = await laptop.findById(product.laptop_reference)

            let amount = Number(product.quantity) * Number(laptops.price)

            let gstamount = (amount * Number(product.gst)) / 100

            let subtotal = amount + gstamount

            grandtotal = grandtotal + subtotal

            const new_bill_product = new Billproduct({

                laptop_reference: product.laptop_reference,
                bill_referece:id,
                quantity: product.quantity,
                amount: amount,
                gst: product.gst,
                gst_amount: gstamount,
                sub_total: subtotal,
             })

             await new_bill_product.save()
             
            }


        else if(product.update === true)
        {
               
            let stock_value =0

               let existing_quantity = (await Billproduct.findById(product._id)).quantity

               let stockdata = await stock.findOne({laptop_reference:product.laptop_reference})

               console.log(stockdata,"stock")

               console.log(existing_quantity,"existing_quantity")

               console.log(product,"product")

            if(existing_quantity<product.quantity){

                let stocky = Number(product.quantity) - Number(existing_quantity)

                stock_value =stockdata.stocklist - stocky
            }
            else
            {
                let stocky = Number(product.quantity) - Number(existing_quantity)

                stock_value =stockdata.stocklist + stocky
            }

            console.log(stock_value,"stockvalue")

            await stock.findByIdAndUpdate(stockdata._id,{stocklist:stock_value}) 




            let laptops = await laptop.findById(product.laptop_reference)

            let amount = Number(product.quantity) * Number(laptops.price)

            let gstamount = (amount * Number(product.gst)) / 100

            let subtotal = amount + gstamount

            grandtotal = grandtotal + subtotal

            const new_bill_product = {

                laptop_reference: product.laptop_reference,
                bill_referece:id,
                quantity: product.quantity,
                amount: amount,
                gst: product.gst,
                gst_amount: gstamount,
                sub_total: subtotal,

            }
            await Billproduct.findByIdAndUpdate(product._id, new_bill_product)


        }
        else if(product.delete === true)
        {
          await Billproduct.findByIdAndDelete(product._id)

          let stockdata = await stock.findOne({laptop_reference:product.laptop_reference})
          await stock.findByIdAndUpdate(stockdata._id,{stocklist:stockdata.stocklist + product.quantity}) 


        }

       else

        {

       grandtotal = grandtotal+product.sub_total

        }
    }
    
    await Bill.findByIdAndUpdate(id,{bill_amount:grandtotal})

    response.json({message:"data updated"})


})



billRouter.delete('/:id', async (request, response) => {

    const { id } = request.params

    await Bill.findByIdAndDelete(id)

    const products_to_bill = await Billproduct.find({ 'bill_referece': id })

    for (let product of products_to_bill)
         {
            
        await Billproduct.findByIdAndDelete(product._id)
    }
    response.json({ message: "data deleted" })

})

export default billRouter

