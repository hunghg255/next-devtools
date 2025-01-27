import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client'
import { type CreateTRPCProxyClient } from '@trpc/client'
import { type AppRouter } from '../../devtools/src/server/router'
import { RPC_SERVER_PORT } from '.'

export interface RPCClient extends CreateTRPCProxyClient<AppRouter> {}
export function createRPCClient(ip?: string): RPCClient {
  const _ip = typeof window === 'undefined' ? 'localhost' : window.location.hostname
  // create persistent WebSocket connection
  const wsClient = createWSClient({ url: `ws://${ip || _ip}:${RPC_SERVER_PORT}` })
  // configure TRPCClient to use WebSockets transport
  return createTRPCProxyClient<AppRouter>({ links: [wsLink({ client: wsClient })] })
}
