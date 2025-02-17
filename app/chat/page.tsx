"use client";
import { useState, useEffect, useRef } from "react";
import SideBar from "@/components/Sidebar";
import { Image, MoreVertical, Plus, SendIcon } from "lucide-react";
import { CircleLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { useNetworkStatus } from "@/context/networkStatus";

interface Message {
  text: string;
  sender: "human" | "ai";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (isOnline) {
      const socket = new WebSocket("wss://65ef-34-45-227-198.ngrok-free.app/chat");

      socket.onopen = () => console.log("Connected to WebSocket");

      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const formattedText = data.message.replace(/\\n/g, "\n");

        setMessages((prev) => [...prev, { text: formattedText, sender: "ai" }]);
        setLoading(false);
      };

      socket.onerror = (error: Event) => {
        console.error("WebSocket Error:", error);
      };

      setWs(socket);
      return () => socket.close();
    }
  }, [isOnline]);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setMessages((prev) => [...prev, { text: input, sender: "human" }]);
      setInput("");
      setLoading(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      <SideBar />

      <div
        className="container mx-auto flex-1 flex flex-col pt-10"
        id="chatpage"
      >
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 w-[90%] mx-auto scrollbar-hide"
          style={{ paddingBottom: "5rem" }}
        >
          {!isOnline ? (
            <p className="text-center text-red-500">You are offline. Please check your internet connection.</p>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "human" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === "human"
                        ? "bg-blue-500 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg"
                        : "bg-gray-300 w-[80vw] text-black rounded-bl-lg rounded-tr-lg rounded-br-lg"
                    } px-6 py-2 max-w-xs shadow-md`}
                  >
                    {msg.sender === "ai" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <CircleLoader color="#0E86D4" size={40} />
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-[90%] shadow-md p-4 fixed bottom-0 flex items-center gap-4 ml-24 bg-black">
          <button
            className="p-2 rounded-md hover:bg-gray-400 focus:outline-none"
            aria-label="Add an attachment"
          >
            <Plus />
          </button>
          <button
            className="p-2 rounded-md hover:bg-gray-400 focus:outline-none"
            aria-label="Add an image"
          >
            <Image role="img" aria-label="Add an image" />
          </button>
          <button
            className="p-2 rounded-md hover:bg-gray-400 focus:outline-none"
            aria-label="More options"
          >
            <MoreVertical />
          </button>

          <div className="flex-1">
            <input
              type="text"
              disabled={loading || !isOnline}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              className="w-full p-2 border rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={sendMessage}
            className="p-2 rounded-md hover:bg-blue-400 focus:outline-none text-blue-500"
            aria-label="Send message"
            disabled={loading || !isOnline}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}