import express from "express";
import { verifyToken } from "../../middleware/verifytoken.js";
import { createquestion, createquiz,  deletequestion,  getQuizById,  getQuizes, updatequestion, updatequizname } from "../../Controller/teacher/createQuiz.controller.js";

// console,log(register);






const router=express.Router();

console.log("fasbfafnjabfaf");
router.post("/creatquiz",verifyToken, createquiz);
router.get("/getquiz",verifyToken, getQuizes);
router.get("/getquizbyid",verifyToken, getQuizById);
router.post("/createquestion",verifyToken, createquestion);
router.put("/updatequestion",verifyToken, updatequestion);
router.put("/updatequizname",verifyToken, updatequizname);
router.delete("/deletequestion",verifyToken, deletequestion);




export default router;