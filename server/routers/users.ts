import { t } from '../trpc'
import { z } from 'zod'
import { observable } from '@trpc/server/observable'
import { EventEmitter } from 'stream'

const userProcedure = t.procedure.input(z.object({ userId: z.string() }))
const eventEmitter = new EventEmitter()

export const userRouter = t.router({
    get: userProcedure.query(({ input }) => {
        return { id: input.userId }
    }),
    update: userProcedure.input(z.object({ name: z.string() }))
        .output(z.object({ name: z.string(), userId: z.string() }))
        .mutation(req => {
            console.log(req.input);
            eventEmitter.emit('update', req.input)
            return { userId: req.input.userId, name: req.input.name, password: '123' }
        }),
    onUpdate: t.procedure.subscription(() => {
        return observable<string>(emit => {
            eventEmitter.on('update', emit.next)
            return () => {
                eventEmitter.off('update', emit.next)
            }
        })
    })
})