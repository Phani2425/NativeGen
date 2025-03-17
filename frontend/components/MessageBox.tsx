import { MutableRefObject, useState } from "react";
import { Message } from "./ChatWindow";
import {
  BookCopy,
  Disc3,
  Layers3,
  Plus,
  Share,
  StopCircle,
  Volume2,
} from "lucide-react";
import MessageSources from "./MessageSources";
import { cn } from "@/lib/utils";
import Markdown from "markdown-to-jsx";

const MessageBox = ({
  Message,
  messageIndex,
  history,
  loading,
  isLast,
  dividerRef,
  rewrite,
  sendMessage,
}: {
  Message: Message;
  messageIndex: number;
  history: Message[];
  loading: boolean;
  isLast: boolean;
  dividerRef: MutableRefObject<HTMLDivElement | null> | undefined;
  rewrite: (messageId: string) => void;
  sendMessage: (message: string) => void;
}) => {
  const [parsedMessage, setparsedMessage] = useState(Message.content);

  return (
    <div>
      {Message.role === "user" && (
        <div className={`w-full ${messageIndex == 0 ? "pt-16" : "pt-8"} `}>
          <h2 className="font-medium text-3xl lg:w-9/12 ">{Message.content}</h2>
        </div>
      )}

      {Message.role === "assistant" && (
        <div className="flex flex-col space-y-9 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-9 ">
          <div
            ref={dividerRef}
            className="flex flex-col space-y-6 w-full lg:w-9/12"
          >
            {Message.sources && Message.sources.length > 0 && (
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center sapce-x-2">
                  <BookCopy className="" size={20} />
                  <h3 className="font-medium text-xl ">Sources</h3>
                </div>
                <MessageSources sources={Message.sources} />
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-2">
                <Disc3
                  className={cn(
                    "text-white",
                    isLast && loading ? "animate-spin" : "animate-none"
                  )}
                  size={20}
                />
                <h3 className="text-white font-medium text-xl">Answer</h3>
              </div>
              <Markdown className="prose max-w-none break-words prose-invert prose-p:leading-relaxed prose-pre:p-0 text-white text-sm md:text-base font-medium">
                {parsedMessage}
              </Markdown>
              {/* {!loading && (
                <div className="flex flex-row items-center justify-between w-full text-white py-4 -mx-2">
                  <div className="flex flex-row items-center space-x-1">
                    <button className="p-2 text-white/70 rounded-xl hover:bg-[#1c1c1c] transition duration-200 hover:text-white">
                      <Share size={18} />
                    </button>
                    <Rewrite rewrite={rewrite} messageId={message.id} />
                  </div>
                  <div className="flex flex-row items-center space-x-1">
                    <Copy initialMessage={message.content} message={message} />
                    <button
                      onClick={() => {
                        if (speechStatus === "started") {
                          stop();
                        } else {
                          start();
                        }
                      }}
                      className="p-2 text-white/70 rounded-xl hover:bg-[#1c1c1c] transition duration-200 hover:text-white"
                    >
                      {speechStatus === "started" ? (
                        <StopCircle size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}
              {isLast &&
                Message.suggestions &&
                Message.suggestions.length > 0 &&
                Message.role === "assistant" &&
                !loading && (
                  <>
                    <div className="h-px w-full bg-[#1C1C1C]" />
                    <div className="flex flex-col space-y-3 text-white">
                      <div className="flex flex-row items-center space-x-2 mt-4">
                        <Layers3 />
                        <h3 className="text-xl font-medium">Related</h3>
                      </div>
                      <div className="flex flex-col space-y-3">
                        {Message.suggestions.map((suggestion, i) => (
                          <div
                            key={i}
                            className="flex flex-col space-y-3 text-sm"
                          >
                            <div className="h-px w-full bg-[#1C1C1C]" />
                            <div
                              onClick={() => sendMessage(suggestion)}
                              className="cursor-pointer flex flex-row justify-between font-medium space-x-2 items-center"
                            >
                              <p className="hover:text-[#24A0ED] transition duration-200">
                                {suggestion}
                              </p>
                              <Plus size={20} className="text-[#24A0ED]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
