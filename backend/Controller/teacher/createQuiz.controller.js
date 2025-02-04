import prisma from "../../lib/prisma.js";

export const createquiz =async(req,res)=>{
  
    console.log("hoiii")

    try{
        const userId=req.userId;

    const {quizName, date,startTime,endTime}=req.body;

    

    const newQuiz=await prisma.quiz.create({
        data:{
            quizName,
            date:new Date(date + "T00:00:00Z"),
            startTime,
            endTime,
            teacherId:userId
        }
    })

    res.status(200).send("Quiz created successfully");
          


    }
    catch(err){

        console.log(err)
        res.status(400).send("failed")

    }

    


}