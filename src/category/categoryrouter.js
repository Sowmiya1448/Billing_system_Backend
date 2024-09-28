import express from 'express'
import { category } from './categorymodel.js'
import { authentication } from '../Authentication/authentication.js'

const categoryrouter = express.Router()


categoryrouter.get('/all',async(request,response)=>{

        const categorylist = await category.find({})

        response.json(categorylist)
})

categoryrouter.get('/:id',async(request,response)=>{

    const {id} =request.params
    
    const onedata = await category.findById(id)

    response.json(onedata)


    
})

categoryrouter.post('/add',async(request,response)=>{

    console.log(request.body)

    const newdata = new category(request.body)

    await newdata.save()

    response.json({message:"data received"})
})

categoryrouter.patch('/:id',async(request,response)=>{


    
})

categoryrouter.delete('/:id',async(request,response)=>{


    const {id} =request.params
  
    await category.findByIdAndDelete(id)
    response.json({message:"data deleted"})


    
})
export default categoryrouter