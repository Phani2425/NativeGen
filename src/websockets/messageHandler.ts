import { WebSocket,EventEmitter } from "ws";
import {AIMessage, BaseMessage, HumanMessage} from '@langchain/core/messages'
import handleWebSearch from "../agents/webSearchAgent";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Embeddings } from "@langchain/core/embeddings";

type Message = {
    type:string,
    content:string,
    copilot:string,
    focusMode:string,
    history:Array<[string,string]>
}

const searchHandleMapping = {
    webSearch: handleWebSearch,
}


export const handleMessage = async (message:string,ws: WebSocket, llm: BaseChatModel, embeddings:Embeddings) => {
  try{
    const parsedMessage = JSON.parse(message) as Message;

    if(!parsedMessage.content){
        ws.send(JSON.stringify({type:'error', data:'no content present in the message'}));
        return;
    }

    // if the message is valid first create an id for that
    const id = Math.random().toString(36).substring(7);
    const processed_chat_history: BaseMessage[] = parsedMessage.history.map((entity) => {
        if(entity[0] == "human"){
            return new HumanMessage({content:entity[1]})
        }
        else{
            return new AIMessage({content:entity[1]})
        }
    });

    if(parsedMessage.type === "Message"){
            // choosing coorrecct search handler for the message coming from the client by checking the value in its focus mode
    //remeber how many ways were there ro access a field of an object and what was the way in which we were accesing a field but for that we needed to execute soemthing 
    //like here for accesing a field we need to check first fo the value present in the focusmode field of message
    const handler = searchHandleMapping[parsedMessage.focusMode];
    //by chnace agar wo wala handler nehi hai to???
    if(!handler){
        ws.send(JSON.stringify({type:'error',data:'requested search agent is not available'}))
       return;
    }

    //now i will call the handler and that will return me a emitEvent object and willl get executed asynchronously and keep on emiting event as per its preogress
    const emmiter = handler(
        parsedMessage.content,
        processed_chat_history,
        llm,
        embeddings
    )

    handleEmitterEvents(emmiter,ws,id);
    }

  }catch(err){
    console.error("failed to ahndle message", err);
    ws.send(JSON.stringify({type:'error', data:'invalid message format'}))
  }
}


const handleEmitterEvents = (
    emitter: EventEmitter,
    ws: WebSocket,
    id: string
  ) => {
    emitter.on("data", (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "response") {
        ws.send(
          JSON.stringify({
            type: "message",
            data: parsedData.data,
            messageId: id,
          })
        );
      } else if (parsedData.type === "sources") {
        ws.send(
          JSON.stringify({
            type: "sources",
            data: parsedData.data,
            messageId: id,
          })
        );
      }
    });
    emitter.on("end", () => {
      ws.send(JSON.stringify({ type: "messageEnd", messageId: id }));
    });
    emitter.on("error", (data) => {
      const parsedData = JSON.parse(data);
      ws.send(JSON.stringify({ type: "error", data: parsedData.data }));
    });
  };