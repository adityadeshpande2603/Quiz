import express from "express";
import { verifyToken } from "../../middleware/verifytoken.js";
import { createquestion, createquiz,  getQuizes } from "../../Controller/teacher/createQuiz.controller.js";

// console,log(register);






const router=express.Router();

console.log("fasbfafnjabfaf");
router.post("/creatquiz",verifyToken, createquiz);
router.get("/getquiz",verifyToken, getQuizes);
router.post("/createquestion",verifyToken, createquestion);




export default router;