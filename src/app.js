import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'

import UserRouter from './Authentication/userRouter.js'
import lapRouter from './laptops/laptopRouter.js'
import billRouter from './orders/billsRouter.js'
import categoryrouter from './category/categoryrouter.js'
import cus_router from './customer/customerRouter.js'
import stockRouter from './stock/stockrouter.js'
import paymentRouter from './payment/paymentrouter.js'



const app = express()
app.use(json({ limit: "50mb" }))
app.use(urlencoded({ limit: "50mb", extended: true }))

config()
app.use(cors())

const port = process.env.port
const mongo = process.env.mongo


app.use('/laptop/', lapRouter)
app.use('/bill/', billRouter)
app.use('/category/', categoryrouter)
app.use('/customer/', cus_router)
app.use('/stock/', stockRouter)
app.use('/user/', UserRouter)
app.use('/payment/', paymentRouter)



const start = async () => {

    await connect(mongo)
    app.listen(port, console.log(`serving on port ${port}`))

}
start()