import express, { request } from 'express'
import { stock } from './stockmodel.js'

const stockRouter = express.Router()

stockRouter.get('/all' ,async(request,response) =>{

    let getdata = await stock.find({})

    response.json(getdata)

})

stockRouter.get('/:id' ,async(request,response) =>{

    const {id} = request.params

    let singledata = await stock.findById(id)

    response.json(singledata)


})


stockRouter.post('/add' ,async(request,response) =>{

   // console.log(request.body)

    const newdata = new stock(request.body)

    await newdata.save()

    response.json({message:"data received in stockmodel"})
})


stockRouter.patch('/:id' ,async(request,response) =>{

    const {id} = request.params

    await stock.findByIdAndUpdate(id,request.body)

    response.json({message:"data updated in stockmodel"})

})

stockRouter.delete('/:id' ,async(request,response) =>{

    const {id} = request.params

    await stock.findByIdAndDelete(id)

    response.json({message:"data deleted in stockmodel"})

})

export default stockRouter

