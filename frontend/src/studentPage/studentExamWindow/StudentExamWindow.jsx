import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { AuthContext } from "../../../lib/authContext/AuthContext";

const StudentExamWindow = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState({});
    const [timeLeft, setTimeLeft] = useState("");
    const [quizName, setQuizName] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [overQuiz, setOverQuiz] = useState(false);
    const [active, setActive] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [date, setDate] = useState();

    const {currentUser}=useContext(AuthContext)


  
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(
                    `https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/getquizbyid?quizId=${quizId}`,
                    { withCredentials: true }
                );

                setQuizName(res.data.quizName);
                setQuestions(res.data.questions || []);
                setActive(res.data.isActive);
                setStartTime(res.data.startTime);
                setEndTime(res.data.endTime);
                setDate(res.data.date);

                const answers = {};
                res.data.questions.forEach((question) => {
                    answers[question.id] = question.correctAnswer;
                });
                setCorrectAnswer(answers);

                startTimer(res.data.date, res.data.startTime, res.data.endTime);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    const startTimer = (date, startTime, endTime) => {
        const interval = setInterval(() => {
            const now = moment().tz("Asia/Kolkata");
            const quizStartTime = moment.tz(`${date} ${startTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
            const quizEndTime = moment.tz(`${date} ${endTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
            const timeUntilStart = moment.duration(quizStartTime.diff(now));
            const timeUntilEnd = moment.duration(quizEndTime.diff(now));

            if (timeUntilStart.asSeconds() > 0) {
                setTimeLeft(`Quiz starts in: ${timeUntilStart.hours()}h ${timeUntilStart.minutes()}m ${timeUntilStart.seconds()}s`);
            } else if (timeUntilEnd.asSeconds() > 0) {
                setActive(true);
                setTimeLeft(`Time left: ${timeUntilEnd.hours()}h ${timeUntilEnd.minutes()}m ${timeUntilEnd.seconds()}s`);
            } else {
                setTimeLeft("Time Over!");
                setOverQuiz(true);
                clearInterval(interval);
            }
        }, 1000);
    };

    const handleOptionSelect = (questionId, selectedOption) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = async () => {
        if (!window.confirm("Are you sure you want to submit the quiz?")) return;

        console.log("Responses Submitted:", responses);
        try {
            console.log(currentUser);
            const res = await axios.post(
                `https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/createattempt?quizId=${quizId}&studentId=${currentUser.id}`,
                {},
                { withCredentials: true }
            );

            let correctCountTemp = 0;

            for (const key of Object.keys(responses)) {
                const isCorrect = responses[key] === correctAnswer[key];
                if (isCorrect) correctCountTemp++;

                try {
                    await axios.post(
                        `https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/createresponse?quizId=${quizId}`,
                        {
                            attemptId: res.data.id,
                            questionId: key,
                            selectedAnswer: responses[key],
                            isCorrect: isCorrect,
                        },
                        { withCredentials: true }
                    );
                } catch (e) {
                    console.log(`Error submitting response for ${key}:`, e);
                }
            }

            setCorrectCount(correctCountTemp);
            await axios.put(
                "https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/updateattempt",
                { attemptId: res.data.id, score: correctCountTemp },
                { withCredentials: true }
            );

            alert("Quiz Submitted Successfully!");
            navigate(`/student/result/${quizId}/${res.data.id}`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    if (!active) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h2 className="text-2xl font-bold text-red-600">This quiz is not active yet!</h2>
                <h2 className="text-lg font-bold">{timeLeft}</h2>
            </div>
        );
    }

    if (overQuiz) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h2 className="text-2xl font-bold text-red-600">Quiz Over!</h2>
                <h2 className="text-lg font-bold">Your responses have been submitted.</h2>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="exam-container flex flex-col h-screen">
            <div className="flex justify-between items-center px-6 py-3 bg-gray-200">
                <h2 className="text-lg font-bold">{timeLeft}</h2>
                <h2 className="text-lg font-bold">{quizName}</h2>
                <h2 className="text-lg font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
            </div>

            <div className="flex flex-1">
                <div className="w-1/4 p-4 border-r bg-gray-100 space-y-3">
                    <h2 className="text-xl font-bold mb-4">Quiz Navigation</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                className={`p-2 text-white rounded ${responses[q.id] ? "bg-green-500" : "bg-gray-500"}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Question {currentQuestionIndex + 1}</h2>
                    <p className="mb-4 text-lg">{currentQuestion.question}</p>

                    <div className="options space-y-3">
                        {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                            <button
                                key={optionKey}
                                className={`w-full p-3 text-left border rounded-md hover:bg-blue-100 ${responses[currentQuestion.id] === currentQuestion[optionKey] ? "bg-blue-200" : "bg-white"}`}
                                onClick={() => handleOptionSelect(currentQuestion.id, currentQuestion[optionKey])}
                            >
                                {currentQuestion[optionKey]}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button className="quiz-button" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>
                        <button className="quiz-button bg-red-500 hover:bg-red-600" onClick={handleSubmit}>Submit</button>
                        <button className="quiz-button" disabled={currentQuestionIndex === questions.length - 1} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentExamWindow;