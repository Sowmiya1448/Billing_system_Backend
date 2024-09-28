import express from 'express'
import { payment } from './paymentmodel.js'
import { Bill } from '../orders/ordermodel.js'

const paymentRouter = express.Router()


paymentRouter.get('/all/',async(request,response) =>{

    const getdata = await payment.find({})
    response.json(getdata)


})

paymentRouter.get('/:id',async(request,response) =>{

    const {id} = request.params

    let get_singledata = await payment.findById(id)
    
    response.json(get_singledata)

})

paymentRouter.post('/add/',async(request,response) =>{


    console.log(request.body)

    const newdata = new payment(request.body)

    await newdata.save()

    response.json({message:"data received in paymentmodel"})


})


paymentRouter.patch('/:id/', async (request, response) => {
    
    let paidamount = request.body.paid;  
    let customerRef = request.body.customer_ref;
    
    const bills = await Bill.find({ customer_ref: customerRef }).sort({ createdAt: 1 }); 

    for (let bill of bills) {

        if (paidamount <= 0) break;  

        let balance = bill.bill_amount;  

        if (paidamount >= balance) {
           
            paidamount -= balance;
            await Bill.findByIdAndUpdate(bill._id, { bill_status: 'Paid' });
        } 
        else {
           
            await Bill.findByIdAndUpdate(bill._id, { bill_status: 'Partially Paid' });
            paidamount = 0;  
        }
    }

    const { id } = request.params;
    await payment.findByIdAndUpdate(id, request.body);  

    response.json({ message: 'Payment applied successfully and data updated.' });
});


paymentRouter.delete('/:id/',async(request,response) =>{

    const {id} = request.params

    await payment.findByIdAndDelete(id)

    response.json({message:"data updated in paymentmodel"})



})


export default paymentRouter