import { createTRPCProxyClient, httpBatchLink, wsLink, createWSClient, splitLink } from '@trpc/client'
import { AppRouter } from '../../server/api'

const wsClient = createWSClient({
    url: 'ws://localhost:3000/trpc',
})

const client = createTRPCProxyClient<AppRouter>({
    links: [
        splitLink({
            condition(op) {
                return op.type === 'subscription'
            },
            true: wsLink({
                client: wsClient
            }),
            false: httpBatchLink({
                url: 'http://localhost:3000/trpc',
                headers: { Authorization: "TOKEN" }
            })
        }),
    ]
})

document.addEventListener('click', () => {
    client.users.update.mutate({ userId: '1122344', name: 'zhangjiawen' })

})

async function main() {
    //  const result = await client.users.update.mutate({userId:'123',name:'change'})
    // const result = await client.secretData.query()
    // console.log(result);
    client.users.onUpdate.subscribe(undefined, {
        onData: data => {
            console.log("update", data);
        }
    })
    // wsClient.close()
}

await main()