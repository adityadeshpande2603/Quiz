import { useState, useEffect } from "react";
import axios from "axios";

const TeacherHomePageLeft = () => {
    const [quizzes, setQuizzes] = useState([]);  // Store all quizzes
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);  // Store filtered quizzes
    const [searchQuery, setSearchQuery] = useState("");  // Search input state

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/auth/teacher/homepage/getquiz", { withCredentials: true });
                setQuizzes(res.data);
                setFilteredQuizzes(res.data);  // Initially, show all quizzes
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    // Filter quizzes when searchQuery changes
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredQuizzes(quizzes); // Show all if search is empty
        } else {
            setFilteredQuizzes(
                quizzes.filter(quiz =>
                    quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, quizzes]);

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Find Quiz"
                className="border border-black border-solid m-2 px-2 py-1 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Quiz List */}
            {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center">
                        <img src="/Avatar.jpg" alt="Quiz Avatar" className="size-8 rounded-full m-4" />
                        <div>{quiz.quizName}</div>
                    </div>
                ))
            ) : (
                <p>No quizzes found.</p>
            )}
        </div>
    );
};

export default TeacherHomePageLeft;