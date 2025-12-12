const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

/* ----------------------- CORS CONFIG ----------------------- */
/* Works for:
   ✔ Localhost (5173, 5174)
   ✔ Render frontend URL (from .env)
   ✔ Avoids CORS errors
*/
const allowedOrigins = [
  "https://jadhavarcbse.com",
  "https://jadhavarcbse.com",
  process.env.FRONTEND_URL   // <- your Render frontend URL
].filter(Boolean); // remove undefined/null

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
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ----------------------- Routes ----------------------------- */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/careers', require('./routes/careers'));

/* ----------------------- Start Server ----------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
