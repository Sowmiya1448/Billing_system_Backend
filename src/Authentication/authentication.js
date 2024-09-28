import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const authentication = (request,response,next) =>{

    const  authHeader = request.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return response.sendStatus(401)

        jwt.verify(token,process.env.Access_tokenkey,(error,user) =>{

            if(error){
                console.log(error)
                return response.sendStatus(403)
            }

            request.user = user
            next()

})

}