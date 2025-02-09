"use client";
import { useState, useEffect, useRef } from "react";
import SideBar from "@/components/Sidebar";
import { Image, MoreVertical, Plus, SendIcon } from "lucide-react";

interface Message {
  sender: "user";
  content: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/chat");
    socketRef.current = socket;

    // Handle incoming messages
    socket.onmessage = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    const message: Message = { sender: "user", content: input };
    socketRef.current.send(JSON.stringify(message));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex">
  {/* Sidebar */}
  <SideBar />
  <div className="container mx-auto flex-1 flex flex-col h-screen pt-10" id="chatpage">
    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 w-[90%] mx-auto scrollbar-hide" style={{ paddingBottom: "5rem" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              msg.sender === "user"
                ? "bg-blue-500 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg"
                : "bg-gray-300 text-black rounded-bl-lg rounded-tr-lg rounded-br-lg"
            } px-10 py-2 max-w-xs shadow-md`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>

    {/* Input Box */}
    <div className="w-[90%] shadow-md p-4 fixed bottom-0 flex items-center gap-4 mx-auto ">
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
        <Image role="img" aria-label="Add an image"/>
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
      >
        <SendIcon />
      </button>
    </div>
  </div>
</div>

  );
}
