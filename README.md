AI-Powered Support Assistant
📌 Overview

This is a full-stack AI-powered Support Assistant built using React, Node.js, and SQLite.

The application allows users to interact with an AI assistant through a simple chat interface. The assistant provides responses strictly based on predefined product documentation. If a question is asked outside the available documentation, the assistant clearly responds:

"Sorry, I don’t have information about that."

The system maintains session-based conversation history and stores all chat data persistently using SQLite.

🧠 Tech Stack

Frontend: React.js

Backend: Node.js with Express

Database: SQLite

AI Integration: Document-restricted LLM (provider configurable via environment variables)

🚀 Key Features

Clean and responsive React chat interface

Session handling using sessionId stored in localStorage

Persistent storage of conversations using SQLite

Conversation history restored after page refresh

AI responses strictly limited to provided documentation

Maintains last 5 user–assistant message pairs as context

“New Chat” functionality

Basic backend validation and error handling

📂 Project Structure
ai-support-assistant/
│
├── backend/
│   ├── index.js
│   ├── db.sqlite
│   ├── docs.json
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Chat.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   └── package.json
│
└── README.md
🗄️ Database Design
sessions table
Column	Type
id	TEXT
created_at	DATETIME
updated_at	DATETIME
messages table
Column	Type
id	INTEGER (Primary Key)
session_id	TEXT
role	TEXT (user / assistant)
content	TEXT
created_at	DATETIME

Each session stores its messages separately, allowing session-wise context management.

🔌 API Endpoints
POST /api/chat

Handles incoming user messages and returns the AI response.

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

Returns all messages for a specific session in chronological order.

GET /api/sessions

Returns all session IDs along with their last updated timestamps.

📄 Document-Based Answering

The assistant uses only the content available in docs.json.

Example:

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

If a query is outside this documentation, the assistant responds:

"Sorry, I don’t have information about that."

This ensures controlled and reliable responses.

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
🧪 Sample Test Cases
User Input	Expected Response
Reset Password	Users can reset password from Settings > Security.
Refund Policy	Refunds are allowed within 7 days of purchase.
CEO name?	Sorry, I don’t have information about that.
📝 Design Decisions

One session per browser (managed via localStorage)

SQLite chosen for lightweight and simple persistence

LLM provider kept configurable to allow flexibility

Limited context to last 5 message pairs to control token usage

📸 Screenshots

### Chat Interface
![Chat UI](screenshots/Screenshot%20(111).png)

### Conversation Persistence
![Conversation History](screenshots/Screenshot%20(112).png)

### New Chat Session
![New Chat](screenshots/Screenshot%20(113).png)


👤 Author

Killari Mounika

📌 Final Note

This project demonstrates full-stack development skills, REST API design, session-based context management, and controlled AI integration using a document-restricted approach.
