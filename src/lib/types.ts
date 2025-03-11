import {BaseMessage} from '@langchain/core/messages'

type image = {
    img_src:string,
    url:string,
    title:string
}

type BasicChainInput = {
    query:string,
    chat_history:BaseMessage[]
}

export  {image, BasicChainInput};