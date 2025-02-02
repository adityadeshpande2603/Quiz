import express from "express";
import teacherAuthRouter from "./routes/teacher/teacherAuthRoute.js"
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use("/api/auth/teacher",teacherAuthRouter)

// Routes
app.get("/", (req, res) => {
    res.send("Backend Server is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});