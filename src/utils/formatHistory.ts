import { BaseMessage } from "@langchain/core/messages";

const formatChatHistory = (history: BaseMessage[]) => {
  return history
    .map((message) => {
      return `${message._getType()} : ${message.content}`;
    })
    .join("\n");
};

export default formatChatHistory;
