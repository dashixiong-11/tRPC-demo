import {t, adminProcedure} from '../trpc'
import {userRouter} from './users'
export const appRouter = t.router({
    sayHi: t.procedure.query(()=>{
        return 'HI'
    }),
    logToServer: t.procedure.input( v=>{
        if(typeof v === 'string'){ return v }
        throw new Error('Invalid input: Expected string')
    }).mutation(req=>{
        console.log(`Client Says:${req.input }`);
        return true
    }),
    secretData:adminProcedure.query(({ctx})=>{
        console.log(ctx.user);
        return " Super top secret data"
    }),

    users:userRouter,
})

export const margedRouter = t.mergeRouters(appRouter,userRouter)