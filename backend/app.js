import express from "express";
import cookieParser from "cookie-parser";
import teacherAuthRouter from "./routes/teacher/teacherAuthRoute.js"
import QuizRouter from "./routes/Quiz/createQuizRoute.js"
import cors from "cors";
import updateQuizStatus from "./Controller/teacher/quizScheduller/quizScheduler.js";
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use("/api/auth/teacher/homepage",QuizRouter)
app.use("/api/auth/teacher",teacherAuthRouter)

updateQuizStatus();
// Routes
app.get("/", (req, res) => {
    res.send("Backend Server is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});