import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UpcomingQuiz from "../../Components/UpcomingQuiz/UpcomingQuiz";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import QuizBarGraph from "../../Components/QuizBarGraph/QuizBarGraph";
import TeacherHomePageLeft from "../../Components/TeacherHomePageLeft/TeacherHomePageLeft";




const TeacherHomePage = () => {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    const handleShowCreateQuiz = () => {
        setShowCreateQuiz(true);
    };

    const handleHideCreateQuiz = () => {
        setShowCreateQuiz(false);
    };

    return (
        <div className="p-4  h-full w-full relative">
            {/* Header */}
            <div className="flex justify-between items-center text-center border-black border-solid border-2">
                <Link to="/">
                    <img src="/quiz.jpg" alt="Quiz" className="h-20" />
                </Link>
                <div className="flex justify-end items-center">
                    <img
                        src="/plus.jpg"
                        alt="Create Quiz"
                        className="size-16 cursor-pointer"
                        onClick={handleShowCreateQuiz}
                    />
                    <img src="/Avatar.jpg" alt="User Avatar" className="size-16 rounded-full m-4" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex justify-between h-[calc(100vh-5rem)] w-full">
                {/* Left Panel */}
                <div className="left border-black border-solid border-2 w-96 mt-1 h-full overflow-auto flex flex-col items-center  ">
                    <div>
                        <div className="flex items-center space-x-6 justify-center">
                            <div>Created Quiz</div>
                            <img
                                src="/plus.jpg"
                                className="size-16 cursor-pointer"
                                onClick={handleShowCreateQuiz}
                            />
                        </div>
                        {/* <input
                            type="text"
                            placeholder="Find Quiz"
                            className="border border-black border-solid m-2"
                        /> */}
                    </div>

                    {/* List of quizzes */}
                    {/* {[...Array(20)].map((_, index) => (
                        <div key={index} className="flex justify-left items-center">
                            <img src="/Avatar.jpg" alt="Quiz Avatar" className="size-8 rounded-full m-4" />
                            <div>Quiz Name {index + 1}</div>
                        </div>
                    ))} */}
                <TeacherHomePageLeft></TeacherHomePageLeft>
                  
                </div>

                {/* Middle Panel */}
                <div className={`middle h-full w-full flex flex-col   overflow-auto ${showCreateQuiz ? "justify-center items-center" : "items-center"}`}>
                    {/* <p>Select a quiz or create a new one</p> */}
                    {/* <QuizBarGraph></QuizBarGraph> */}
                    <Outlet  ></Outlet>
                    {console.log(showCreateQuiz)}
                    {showCreateQuiz && <CreateQuiz onClose={handleHideCreateQuiz} setShowCreateQuiz={setShowCreateQuiz} showCreateQuiz={showCreateQuiz} />}
                </div>

                {/* Right Panel */}
                <div className="right border-black border-solid border-2  mt-1 h-full overflow-auto flex flex-col w-96">
                    {[...Array(15)].map((_, index) => (
                        <UpcomingQuiz key={index} />
                    ))}
                </div>
            </div>

            {/* CreateQuiz Popup */}

        </div>
    );
};

export default TeacherHomePage;