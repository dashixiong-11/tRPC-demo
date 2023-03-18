import {initTRPC,inferAsyncReturnType,TRPCError} from '@trpc/server'
import { createContext } from './context'


export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create()

const isAdminMiddlewaer = t.middleware(({ctx,next})=>{
    if(!ctx.isAdmin){
        throw new TRPCError({
            message:'Not Admin',
            code:'UNAUTHORIZED'
        })
    }else{
        return next({ctx:{user:{id:1}}})
    }
})

export const adminProcedure = t.procedure.use(isAdminMiddlewaer)
