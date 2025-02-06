import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../lib/authContext/AuthContext";
import axios from "axios";

const CreateQuiz = ({ onClose, setShowCreateQuiz }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    // State to store form data
    const [formData, setFormData] = useState({
        quizName: "",
        date: "",
        startTime: "",
        finishTime: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleContinue = async () => {
        console.log("Form Data:", formData);
        console.log("currentUser:", currentUser);

        // Hide the modal
        setShowCreateQuiz(false);

        // Convert date string (YYYY-MM-DD) to a Date object and format it to ISO
        const formattedDate = new Date(formData.date);
        
        console.log("Formatted Date:", formattedDate.toISOString());
        
        try {
            await axios.post("http://localhost:3000/api/auth/teacher/homepage/creatquiz", {
                quizName: formData.quizName,
                date: formattedDate.toISOString(), // Convert to valid ISO format for Prisma
                startTime: formData.startTime,
                endTime: formData.finishTime,
                teacherId: currentUser.id
            }, { withCredentials: true });

            // Navigate after successful submission
            setTimeout(() => {
                navigate("/teacher/homepage/quizquestion");
            }, 0);
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 z-50 flex items-center justify-center backdrop-blur-sm">
            <form className="relative flex flex-col border border-gray-300 shadow-lg w-96 bg-white p-6 rounded-lg">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white font-bold rounded-full px-3 py-1 hover:bg-red-600"
                >
                    X
                </button>

                <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Create a New Quiz</h2>

                {/* Quiz Name Field */}
                <div className="mb-4">
                    <label htmlFor="quizName" className="block text-gray-600 font-medium mb-2">Quiz Name</label>
                    <input
                        type="text"
                        name="quizName"
                        id="quizName"
                        placeholder="Enter quiz name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={formData.quizName}
                        onChange={handleChange}
                    />
                </div>

                {/* Date Field */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-600 font-medium mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                {/* Start Time Field */}
                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-gray-600 font-medium mb-2">Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                </div>

                {/* Finish Time Field */}
                <div className="mb-6">
                    <label htmlFor="finishTime" className="block text-gray-600 font-medium mb-2">Finish Time</label>
                    <input
                        type="time"
                        name="finishTime"
                        id="finishTime"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={formData.finishTime}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-600"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;