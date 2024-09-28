import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import express from 'express'
import { RefreshToken, user } from './usermodel.js'

const UserRouter = express.Router()

UserRouter.get('/generate/key/', async (request,response) =>{

    const key = crypto.randomBytes(64).toString('hex')
    
        response.json(key)
    
    })

 UserRouter.post('/create/' ,async(request,response) =>{

    const all_user = await user.find({})

    const {username} = request.body

    const user_check = all_user.find(user =>user.username === username)

    if(user_check === undefined) {

        const new_user = new user(request.body)

        await new_user.save()

        response.json("user created")
    }

    else{
        response.json("user with the usename already exists!")
    }

})

UserRouter.post('/validate/' ,async(request,response) =>{

    const {username ,password} = request.body

    const all_user = await user.find({})

    const user_check = all_user.find(user =>user.username === username)

    if(user_check === undefined) response.json({

        status:false,
        message:"Invalid Username"
    }) 

    else{

        if(user_check.password === password){


            const user ={

                name:username
            }

            const access_token = jwt.sign(user,process.env.Access_tokenkey,{expiresIn:"30s"})

            const refresh_token = jwt.sign(user,process.env.Refresh_tokenkey)

            const new_refresh_token = new RefreshToken({

                refresh_token:refresh_token
            })

            await new_refresh_token.save()

            response.json({
                status:true,
                message:"valid user",
                access_token:access_token,
                refresh_token:refresh_token,
                userdata:user_check
            })
     }


        else{
            response.json({

                status:false,
                message:"Invalid Password"
            })
        }

    }

})


UserRouter.post('/logout/',async (request,response)=>{


    const refresh_token = request.body.refresh_token
    
    const all_refresh_tokens = await RefreshToken.find({})
    
    let select_token = all_refresh_tokens.find(token => token.refresh_token === refresh_token)
    
  
    
      await RefreshToken.findByIdAndDelete(select_token._id)
    
    response.status(200).json({message:" refersh token deleted"})
    
    
    })

      UserRouter.post('/token/',async(request,response) =>{

        console.log(request.body)
      
        const refresh_token = request.body.refresh_token

        if( refresh_token === null) {

            return response.status(401).json("no token found")
        }

        const all_refresh_tokens =await RefreshToken.find({refresh_token:refresh_token})

        if(all_refresh_tokens.length === 0){

            return response.status(403).json("invalid token")
        }

        jwt.verify(refresh_token,process.env.Refresh_tokenkey,(error,user) =>{

            if(error)
                {
                return response.status(403).json("token verification failed")
            }

            const access_token = jwt.sign({name:user.name},process.env.Access_tokenkey,{expiresIn:'30s'})

            response.json({

                access_token:access_token
            })
        })


    })



export default UserRouter

