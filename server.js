const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

/* -----------------------------------------
   ✅ SINGLE, CLEAN, CORRECT CORS CONFIG
   ----------------------------------------- */
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,               // Hostinger frontend URL
  "https://cbse-backend-2.onrender.com",   // Render backend URL
  "http://localhost:5173",                 // React dev
  "http://localhost:5174"                  // React dev
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ----------------------- Middleware ------------------------ */
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ----------------------- Database --------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ----------------------- Routes ----------------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/careers', require('./routes/careers'));

/* ----------------------- Start Server ----------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
