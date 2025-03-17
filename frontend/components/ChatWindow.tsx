"use client";
import React, { useEffect, useState } from "react";
import { Document } from "@langchain/core/documents";
import { WebSocket, MessageEvent } from "ws";
import EmptyChat from "./EmptyChat";
import Chat from "./Chat";

export type Message = {
  id: string;
  content: string;
  createdAt?: Date;
  role: "user" | "assistant";
  sources?: Document[];
};

// const useSocket = (url: string) => {
//   const [ws, setws] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     if (!ws) {
//       const ws = new WebSocket(url);
//       ws.onopen = () => {
//         console.log("[DEBUG] open");
//         setws(ws);
//       };
//     }

//     return () => {
//       ws?.close();
//     };
//   }, [ws, url]);

//   return ws;
// };

const useSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Always create a new WebSocket when URL changes
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("[DEBUG] open");
      setWs(ws);
    };

    ws.onclose = () => {
      console.log("[DEBUG] closed");
      setWs(null); // Reset state when ws closes
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return ws;
};

const ChatWindow = () => {
  //   const ws = useSocket(process.env.NEXT_PUBLIC_WS_URL!);
  const [chatHistory, setchatHistory] = useState<Array<[string, string]>>([]);
  const [messages, setmessages] = useState<Message[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [messageAppeared, setmessageAppeared] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<string>("webSearch");

  // now lets create a function which will help us to send the message to the server
  const sendMessage = async (message: string) => {
    if (loading) return;

    try {
      setloading(true);
      setmessageAppeared(false);

      let sources: Document[] | undefined = undefined;
      let recievedMessage = "";
      let added = false;

      ws?.send(
        JSON.stringify({
          type: "message",
          Content: message,
          history: [...chatHistory, ["human", message]],
        })
      );

      setmessages((prevMessages) => [
        ...prevMessages,
        {
          content: message,
          id: Math.random().toString(36).substring(7),
          role: "user",
        },
      ]);

      const messageHandler = (e: MessageEvent) => {
        const data = JSON.parse(e.data);

        if (data.type === "sources") {
          sources = data.data;

          if (!added) {
            setmessages((prevMessages) => [
              ...prevMessages,
              {
                content: "",
                id: data.messageId,
                role: "assistant",
                sources: sources,
              },
            ]);
            added = true;
          }
          setmessageAppeared(true);
        }

        if (data.type === "message") {
          if (!added) {
            setmessages((prevMessages) => [
              ...prevMessages,
              {
                content: data.data,
                id: data.messageId,
                role: "assistant",
                sources: sources,
              },
            ]);

            added = true;
          }

          setmessages((prev) =>
            prev.map((message) => {
              if (message.id === data.messageId) {
                return { ...message, content: message.content + data.data };
              }
              return message;
            })
          );

          recievedMessage += data.data;
          setmessageAppeared(true);
        }

        if (data.type === "messageEnd") {
          setchatHistory((prev) => [
            ...prev,
            ["human", message],
            ["assistant", recievedMessage],
          ]);
          ws?.removeEventListener("message", messageHandler);
          setloading(false);
        }
      };

      ws?.addEventListener("message", messageHandler);
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "error occured while sending user message to server:- ",
          err.message
        );
      } else {
        console.log(
          "unknown error occured while sendin the mesaage to server",
          err
        );
      }
    } finally {
      setloading(false);
    }
  };

  const rewrite = (messageId: string) => {
    const index = messages.findIndex((msg) => msg.id === messageId);

    if (index === -1) return;

    const message = messages[index - 1];

    setmessages((prev) => {
      return [...prev.slice(0, messages.length > 2 ? index - 1 : 0)];
    });

    setchatHistory((prev) => {
      return [...prev.slice(0, messages.length > 2 ? index - 1 : 0)];
    });

    sendMessage(message.content);
  };

  return (
    <div className="w-full h-full">
      {messages.length > 0 ? (
        <Chat
          loading={loading}
          messages={messages}
          sendMessage={sendMessage}
          rewrite={rewrite}
          messageAppeared={messageAppeared}
        />
      ) : (
        <EmptyChat
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
        />
      )}
    </div>
  );
};

export default ChatWindow;
