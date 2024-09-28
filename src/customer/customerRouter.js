import express from 'express'
import { customers } from './customermodel.js'

const cus_router =express.Router()

cus_router.get('/all',async(request,response)=>{

    const getcus = await customers.find({})

    response.json(getcus)


})
cus_router.get('/:id/',async(request,response)=>{
    

    const {id} =request.params
    const getdata = await customers.findById(id)
    response.json(getdata)


})

cus_router.post('/add',async(request,response)=>{

    console.log(request.body)

    const newcus = new customers(request.body)

    await newcus.save()

    response.json(newcus)


})

cus_router.patch('/:id',async(request,response)=>{

    const {id} =request.params

    await customers.findByIdAndUpdate(id,request.body)

    response.json({message:"data updated"})


})

cus_router.delete('/:id',async(request,response)=>{

    const {id} =request.params

    await customers.findByIdAndDelete(id)

    response.json({message:"data Deleted"})


})

export default cus_router