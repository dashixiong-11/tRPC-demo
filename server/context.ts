import {CreateExpressContextOptions} from '@trpc/server/adapters/express'

// export function createContext({req,res}:CreateExpressContextOptions){
//     return {
//         token:'xxx',
//         isAdmin:false,
//         req,res
//     }
// }
export function createContext(){
    return {
        isAdmin:true,
        token:'xxx',
    }
}