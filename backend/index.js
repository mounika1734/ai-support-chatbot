require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});
app.use(limiter);

const chatRoutes = require("./routes/chat");
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});