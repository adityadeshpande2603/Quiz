import { useNavigate } from "react-router-dom";

const CreateQuiz = ({ onClose, setShowCreateQuiz,showCreateQuiz }) => {
    const navigate = useNavigate();

    const handleContinue = () => {
        // Hide the modal first
        setShowCreateQuiz(false);

        // Ensure React updates the state before navigating
        setTimeout(() => {
            navigate("/teacher/homepage/quizquestion");
        }, 0);

        console.log(showCreateQuiz, "from createQuiz")
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 z-50 flex items-center justify-center backdrop-blur-sm">
            {/* Full-screen Form */}
            <form className="relative flex flex-col border border-gray-300 shadow-lg w-96 bg-white p-6 rounded-lg">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white font-bold rounded-full px-3 py-1 hover:bg-red-600"
                >
                    X
                </button>

                {/* Form Header */}
                <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Create a New Quiz</h2>

                {/* Quiz Name Field */}
                <div className="mb-4">
                    <label htmlFor="quizName" className="block text-gray-600 font-medium mb-2">
                        Quiz Name
                    </label>
                    <input
                        type="text"
                        name="quizName"
                        id="quizName"
                        placeholder="Enter quiz name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* Date Field */}
                <div className="mb-4">
                    <label htmlFor="Date" className="block text-gray-600 font-medium mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        id="Date"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* Time Field */}
                <div className="mb-6">
                    <label htmlFor="startTime" className="block text-gray-600 font-medium mb-2">
                       Start Time
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="finishTime" className="block text-gray-600 font-medium mb-2">
                       finish Time
                    </label>
                    <input
                        type="time"
                        id="finishTime"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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