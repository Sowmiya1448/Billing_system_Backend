import express from 'express'
import {laptop} from './laptoModel.js'

const lapRouter = express.Router()


lapRouter.get('/all/',async(request,response)=>{
    
    let all_laptop= await laptop.find({})

    response.json(all_laptop)

})

lapRouter.get('/:id/',async(request,response)=>{
    
    const {id}=request.params

    let lap=await laptop.findById(id)

    response.json(lap)

})


lapRouter.post('/add/',async (request,response)=>{

    console.log(request.body)
    let newlaptop = new laptop(request.body)
     await newlaptop.save()

     response.json(newlaptop)
     
})

lapRouter.delete('/delete/:id/',async (request,response)=>{

    const {id} = request.params

    await laptop.findByIdAndDelete(id)

    response.json(({message:"data deleted"}))

})
lapRouter.patch('/update/:id/',async(request,response)=>{

    const {id} = request.params

    await laptop.findByIdAndUpdate(id,request.body)

    response.json({message:"data updated"})
    
})


export default lapRouter