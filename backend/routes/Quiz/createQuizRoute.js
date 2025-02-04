import express from "express";
import { verifyToken } from "../../middleware/verifytoken.js";
import { createquiz } from "../../Controller/teacher/createQuiz.controller.js";

// console,log(register);






const router=express.Router();


router.post("/creatquiz",verifyToken, createquiz);




export default router;