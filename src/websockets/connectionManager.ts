import { WebSocket } from "ws"
import { handleMessage } from "./messageHandler"


export const handleConnection = (ws:WebSocket) => {
  ws.on('message',
    async (message) => await handleMessage(message.toString(), ws,"fkjbfbf");
   );

   ws.on("close", () => console.log("connection closed"));
};


