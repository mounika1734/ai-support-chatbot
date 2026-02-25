const express = require("express");
const router = express.Router();
const db = require("../db");
const docs = require("../docs.json");

// Helper: find doc match
function findDoc(question) {
  return docs.find(d =>
    question.toLowerCase().includes(d.title.toLowerCase())
  );
}

// POST /api/chat
router.post("/chat", (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: "sessionId and message required" });
  }

  db.run(
    "INSERT OR IGNORE INTO sessions (id) VALUES (?)",
    [sessionId]
  );

  db.run(
    "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
    [sessionId, "user", message]
  );

  const doc = findDoc(message);

  let reply;
  if (!doc) {
    reply = "Sorry, I don’t have information about that.";
  } else {
    reply = doc.content;
  }

  db.run(
    "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
    [sessionId, "assistant", reply]
  );

  res.json({ reply, tokensUsed: 0 });
});

// GET conversation
router.get("/conversations/:sessionId", (req, res) => {
  db.all(
    "SELECT role, content, created_at FROM messages WHERE session_id=? ORDER BY created_at",
    [req.params.sessionId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
});

// GET sessions
router.get("/sessions", (req, res) => {
  db.all(
    "SELECT id, updated_at FROM sessions",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
});

module.exports = router;