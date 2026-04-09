import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
