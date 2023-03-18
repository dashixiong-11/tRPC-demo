import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { margedRouter } from './routers/index'
import { createContext} from './context'
import ws from 'ws'


const app = express()
app.use(cors({origin:'http://localhost:5173'}))
app.use('/trpc',createExpressMiddleware({router: margedRouter, createContext }))
const server = app.listen(3000,function(){
    console.log('正在监听 3000 端口')
})
applyWSSHandler({
    wss: new ws.Server({server}),
    router: margedRouter,
    createContext
})

export type AppRouter = typeof margedRouter
