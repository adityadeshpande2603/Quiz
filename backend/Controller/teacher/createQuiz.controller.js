import prisma from "../../lib/prisma.js";

export const createquiz =async(req,res)=>{
  
    console.log("hoiii")

    try{
        const userId=req.userId;

    const {quizName, date,startTime,endTime}=req.body;

    

    const newQuiz=await prisma.quiz.create({
        data:{
            quizName,
            date:date,
            startTime,
            endTime,
            teacherId:userId
        }
    })
    console.log("success!!")
    res.status(200).send("Quiz created successfully");
          


    }
    catch(err){

        console.log(err)
        res.status(400).send("failed")

    }

    


}

export const getQuizes=async(req,res)=>{
    try{
        const quizzes = await prisma.quiz.findMany({
            orderBy: {
                date: "desc",  // Sort by date in descending order (latest first)
            },
        });

        res.status(200).send(quizzes)
    }
    catch(e){
        res.status(400).send("failed")

    }
}