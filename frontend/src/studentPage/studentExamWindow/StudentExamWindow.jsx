import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const StudentExamWindow = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState({});
    const [timeLeft, setTimeLeft] = useState("");
    // Timer for remaining quiz time
    const [quizName, setQuizName] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [overQuiz, setOverQuiz] = useState(false);
    const [active, setActive] = useState(false);
    const [startTime, setStartTime] = useState();
    const [date, setDate] = useState();
    useEffect(() => {
        if (overQuiz) {
            handleSubmit(); // ✅ Auto-submit when the quiz time is up
        }
    }, [overQuiz]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(
                    `https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/getquizbyid?quizId=${quizId}`,
                    { withCredentials: true }
                );

                console.log("API Response:", res.data);


                setQuizName(res.data.quizName);


                setQuestions(res.data.questions || []);
                setActive(res.data.isActive)


                const answers = {};
                res.data.questions.forEach((question) => {
                    answers[question.id] = question.correctAnswer;
                });

                setCorrectAnswer(answers);
                console.log("Updated correctAnswer:", answers);

                // ✅ Start Timer
                setStartTime(res.data.startTime);
                setDate(res.data.date);
                startTimer(res.data.date, res.data.endTime);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    // ✅ Timer Functionality (Countdown till quiz ends)
    const startTimer = (date, endTime) => {
        const interval = setInterval(() => {
            const now = moment().tz("Asia/Kolkata");
            const quizEndTime = moment.tz(`${date} ${endTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
            const diff = moment.duration(quizEndTime.diff(now));

            if (diff.asSeconds() > 0) {
                setTimeLeft(`${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`);
            } else {
                setTimeLeft("Time Over!");
                setOverQuiz(true);
                clearInterval(interval);
            }
        }, 1000);
    };

    const handleOptionSelect = (questionId, selectedOption) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const jumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = async () => {
        console.log("Responses Submitted:", responses);
        try {
            const res = await axios.post(`https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/createattempt?quizId=${quizId}`, {}, { withCredentials: true });
            console.log("Attempt Created", res.data);

            let correctCountTemp = 0; // ✅ Temporary variable to track correct answers

            for (const key of Object.keys(responses)) {
                console.log(`Key: ${key}, Value: ${responses[key]}`);

                const isCorrect = responses[key] === correctAnswer[key]; // ✅ Compute isCorrect before axios
                if (isCorrect) correctCountTemp++;

                console.log(correctCountTemp);// ✅ Increment correct count

                try {
                    await axios.post(`https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/createresponse?quizId=${quizId}`, {
                        attemptId: res.data.id,
                        questionId: key,
                        selectedAnswer: responses[key],
                        isCorrect: isCorrect // ✅ Properly set boolean value
                    }, { withCredentials: true });

                    console.log("Response Created");
                } catch (e) {
                    console.log(`Error submitting response for ${key}:`, e);
                }
            }

            setCorrectCount(correctCountTemp); // ✅ Update state after loop
            console.log("correctCount", correctCount);
            const updatedRes = await axios.put("https://quiz-1-u3ch.onrender.com/api/auth/teacher/homepage/updateattempt", {
                attemptId: res.data.id,
                score: correctCountTemp
            }, {
                withCredentials: true
            })
            console.log(updatedRes);
            alert("Quiz Submitted Successfully!");
            navigate(`/student/result/${quizId}/${res.data.id}`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };
    if (!Array.isArray(questions) || questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!active) {
        startTimer(date, startTime);

    }
    if (!active) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h2 className="text-2xl font-bold text-red-600">This quiz is not active yet!</h2>
                <h2 className="text-lg font-bold">Quiz starts in: {timeLeft}</h2>
            </div>
        );
    }

    return (
        <div className="exam-container flex flex-col h-screen">
            {/* ✅ Top Section: Timer and Progress */}
            <div className="flex justify-between items-center px-6 py-3 bg-gray-200">
                <h2 className="text-lg font-bold">Quiz Timer: {timeLeft}</h2>
                <h2 className="text-lg font-bold">{quizName}</h2>
                <h2 className="text-lg font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
            </div>

            {/* ✅ Main Content */}
            <div className="flex flex-1">
                {/* ✅ Left Panel - Question Navigation */}
                <div className="w-1/4 p-4 border-r bg-gray-100">
                    <h2 className="text-xl font-bold mb-2">Quiz Navigation</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                className={`p-2 text-white rounded ${responses[q.id] ? "bg-green-500" : "bg-gray-500"}`}
                                onClick={() => jumpToQuestion(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ✅ Right Panel - Question Display */}
                <div className="w-3/4 p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Question {currentQuestionIndex + 1}</h2>
                    <p className="mb-4 text-lg">{currentQuestion.question}</p>

                    <div className="options space-y-3">
                        {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                            <div key={optionKey} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id={`${currentQuestion.id}-${optionKey}`}
                                    name={currentQuestion.id}
                                    value={currentQuestion[optionKey]}
                                    checked={responses[currentQuestion.id] === currentQuestion[optionKey]}
                                    onChange={() => handleOptionSelect(currentQuestion.id, currentQuestion[optionKey])}
                                />
                                <label htmlFor={`${currentQuestion.id}-${optionKey}`} className="cursor-pointer text-lg">
                                    {currentQuestion[optionKey]}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Navigation and Submit Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white rounded"
                            onClick={goToPreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="px-6 py-3 bg-green-500 text-white rounded"
                            onClick={goToNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                    </div>

                    {/* ✅ Submit Button */}
                    {currentQuestionIndex === questions.length - 1 && (
                        <div className="mt-6 text-center">
                            <button
                                className="px-8 py-3 bg-red-500 text-white text-lg rounded"
                                onClick={handleSubmit}
                            >
                                Submit Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentExamWindow;