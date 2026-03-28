import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, LogOut, Menu, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_BOT_MESSAGE =
  "Hello! 👋 Welcome to Scheme AI. I'm your personal assistant to help you find and understand government schemes tailored to your profile. What would you like to know about?";

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: INITIAL_BOT_MESSAGE,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botResponses = [
      "That's a great question! Let me find relevant schemes for you.",
      "Based on your profile, you might be eligible for several schemes. Let me analyze your details.",
      "I can help you with that. Here are some government schemes that match your criteria.",
      "Thank you for sharing that information. Let me find the best options for you.",
    ];

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponses[Math.floor(Math.random() * botResponses.length)],
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      navigate("/login");
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        text: INITIAL_BOT_MESSAGE,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Animated background for chat area */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 blob-animation"></div>
        <div className="absolute top-20 -left-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 blob-animation" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col overflow-hidden relative z-20`}
      >
        <div className="p-6 border-b border-blue-700" style={{ animation: "slide-up 0.6s ease-out" }}>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-blue-900 font-bold">AI</span>
            </div>
            Scheme AI
          </h1>
        </div>

        <div className="flex-1 p-4 space-y-4">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start bg-blue-700 hover:bg-blue-600 text-white transition-all duration-300 hover:shadow-lg"
            style={{ animation: "slide-up 0.6s ease-out 0.1s both" }}
          >
            + New Chat
          </Button>

          <div className="pt-4 border-t border-blue-700">
            <p className="text-xs font-semibold text-blue-200 uppercase px-2 mb-3">
              Recent Chats
            </p>
            {/* Chat history placeholder */}
            <div className="text-xs text-blue-300 px-2 py-2 opacity-60">
              No previous chats
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-blue-700 space-y-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-blue-100 border-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            style={{ animation: "slide-up 0.6s ease-out 0.2s both" }}
          >
            <LogOut className="w-4 h-4 mr-2 transition-transform hover:-translate-x-1" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between" style={{ animation: "slide-up 0.6s ease-out" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div className="flex-1 ml-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Government Schemes Assistant
            </h2>
            <p className="text-sm text-gray-600">
              Find schemes tailored to your profile
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
              style={{
                animation: "slide-up 0.3s ease-out",
                animationFillMode: "both",
              }}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg transition-all ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none hover:bg-blue-700 shadow-md"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none hover:shadow-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4" style={{ animation: "slide-up 0.6s ease-out" }}>
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input
              type="text"
              placeholder="Ask me about government schemes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="h-11 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              💡 Tip: Ask me about eligibility, required documents, or
              application process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
