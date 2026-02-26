AI-Powered Support Assistant
📌 Project Overview

This project is a full-stack AI-powered Support Assistant developed as part of the Innoira technical assignment.

The application enables users to chat with an AI assistant through a React-based user interface. The assistant provides responses strictly based on predefined product documentation, maintains session-wise conversational context, and stores all conversations persistently using SQLite.

If a user asks a question outside the provided documentation, the assistant responds:

"Sorry, I don’t have information about that."

🧠 Tech Stack Used

Frontend: React.js

Backend: Node.js (Express)

Database: SQLite

LLM Integration: Document-restricted LLM (OpenAI / Claude / Gemini – pluggable)

📂 Project Structure
innoira-AI-Support/
│
├── backend/
│   ├── index.js              # Express server & API routes
│   ├── db.sqlite             # SQLite database
│   ├── docs.json             # Product documentation
│   ├── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Chat.js           # Chat UI & session handling
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│
├── README.md                 # Assignment documentation
🚀 Features Implemented

React-based chat interface

Session handling using sessionId stored in localStorage

Persistent conversation storage using SQLite

Conversation history restored on page refresh

Document-based AI responses (no hallucination)

Maintains last 5 user–assistant message pairs as context

“New Chat” functionality

Backend error handling and validation

🗂️ Database Schema
sessions Table
Column	Type
id	TEXT
created_at	DATETIME
updated_at	DATETIME
messages Table
Column	Type
id	INTEGER (Primary Key)
session_id	TEXT
role	TEXT (user / assistant)
content	TEXT
created_at	DATETIME

All conversations are stored persistently in SQLite.

🔌 Backend API Endpoints
POST /api/chat

Handles user messages and returns AI responses.

Request

{
  "sessionId": "abc123",
  "message": "Reset Password"
}

Response

{
  "reply": "Users can reset password from Settings > Security.",
  "tokensUsed": 120
}
GET /api/conversations/:sessionId

Returns all messages for a session in chronological order.

GET /api/sessions

Returns all session IDs with their last updated timestamps.

📄 Document-Based Answering

The assistant uses only the content available in docs.json:

[
  {
    "title": "Reset Password",
    "content": "Users can reset password from Settings > Security."
  },
  {
    "title": "Refund Policy",
    "content": "Refunds are allowed within 7 days of purchase."
  }
]

If a question is outside this documentation, the assistant responds:

"Sorry, I don’t have information about that."

⚙️ Setup Instructions
Backend Setup
cd backend
npm install
node index.js

Backend runs at:
http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

✅ Assignment Requirements Met

✔ React frontend with chat UI
✔ Node.js backend with REST APIs
✔ SQLite database for persistence
✔ Session-wise context management
✔ Document-only AI responses
✔ Conversation history restoration

🧪 Sample Test Cases
User Input	Expected Response
Reset Password	Users can reset password from Settings > Security.
Refund Policy	Refunds are allowed within 7 days of purchase.
CEO name?	Sorry, I don’t have information about that.
📝 Assumptions

One session per browser using localStorage

SQLite is sufficient for assignment-scale usage

LLM provider can be replaced without major code changes

📸 Screenshots

### Chat Interface
![Chat UI](screenshots/Screenshot%20(111).png)

### Conversation Persistence
![Conversation History](screenshots/Screenshot%20(112).png)

### New Chat Session
![New Chat](screenshots/Screenshot%20(113).png)

👤 Author

Name: Killari Mounika
Assignment: Innoira – AI-Powered Support Assistant

🏁 Final Note

This project fulfills all mandatory requirements of the Innoira assignment and demonstrates full-stack development skills, persistent data handling, and controlled AI integration.
