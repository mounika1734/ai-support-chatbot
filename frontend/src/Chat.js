import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Session handling
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }

  // 🔹 Fetch conversation history on page load
  useEffect(() => {
    fetch(`http://localhost:5000/api/conversations/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Error fetching history:", err));
  }, [sessionId]);

  // 🔹 New Chat function
  const newChat = () => {
    const newSessionId = uuidv4();
    localStorage.setItem("sessionId", newSessionId);
    window.location.reload();
  };

  // Send message
  const sendMessage = async () => {
    if (!input) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: input })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: data.reply }
      ]);

      setInput("");
    } catch (error) {
      alert("Backend not reachable. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Support Assistant</h2>

      {/* New Chat Button */}
      <button onClick={newChat} style={{ marginBottom: "10px" }}>
        New Chat
      </button>

      <div style={{ marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;