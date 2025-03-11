import { initServer } from "./websocketServer"
import http from  'http'

export const startWebsocketServer = (
     server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
     initServer(server);
}