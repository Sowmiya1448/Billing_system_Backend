//http methods

app.get('/students/', (request,response)=>{

    response.send("postman")
})


app.post('/students/',(request,response)=>{
    
    console.log(request.body)

    response.send({"mesage":"data saved"})
})

app.patch('/students/:id/',(request,response)=>{
    const {id}=request.params
    console.log(id)
    response.json({ "message":" data updated"})
})
app.delete('/students/:id/',(request,response)=>{

    const {id}=request.params
    console.log(id)
    response.json({  "message":"data deleted"})
})

//bill calculations


const calculations = async(request,response) =>{

    console.log(request.body)

    const billdetails = request.body[0]

    const newbill = new Bill(billdetails)

    await newbill.save()

    const billproducts = request.body[1]

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

    response.json({message:"data received calc"})

}

billRouter.post('/add', calculations)