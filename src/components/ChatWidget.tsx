import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import axios from "axios";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I’m your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await axios.post("/api/chat", { message: userMessage });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  useEffect(() => {
    // Auto-open chat after 1 second
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    // Auto-close chat after 10 seconds
    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 11000); // 1s delay + 10s duration

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white border shadow-xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-3 flex justify-between items-center text-sm font-medium">
            <span>Support Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold focus:outline-none"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[70%] px-3 py-2 rounded-lg ${
                  msg.type === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-3 py-1 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-primary text-white rounded-full p-3 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
