const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    // Create new admin
    const admin = new User({
      username: "admin",      // CHANGE IF YOU WANT
      password: "admin123",   // CHANGE IF YOU WANT
      role: "admin",
    });

    await admin.save();
    console.log("\n🎉 Admin user created successfully!");
    console.log("👤 Username: admin");
    console.log("🔑 Password: admin123\n");

    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
