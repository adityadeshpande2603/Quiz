import { useState } from "react";

const Question = ({ divId, removeDiv, addDiv }) => {
    const [formData, setFormData] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        difficulty: "",
        correctOption: "", // Only one correct option
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxClick = (option) => {
        setFormData((prev) => ({
            ...prev,
            correctOption: option, // Set the new correct option, replacing the previous one
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // You can pass formData to a parent component or save it in state
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="border-solid border-black border-2 rounded-2xl mt-4 p-4">
                    <div className="flex">
                        <textarea
                            name="question"
                            placeholder="Quiz Description/Instruction"
                            className="w-full h-14 p-2 border border-gray-300 rounded-md mt-3"
                            rows={3}
                            value={formData.question}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <select
                            name="difficulty"
                            className="border border-gray-300 rounded p-2 w-64 ml-3"
                            value={formData.difficulty}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                -- Choose Difficulty --
                            </option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div className="options mt-4">
                        {["optionA", "optionB", "optionC", "optionD"].map((option, index) => (
                            <div
                                key={option}
                                className={`flex items-center space-x-2 text-center ${formData.correctOption === option ? "bg-green-500" : ""
                                    } p-2`}
                            >
                                <div
                                    className="h-7 w-7 border-black border-solid border-2 cursor-pointer"
                                    onClick={() => handleCheckboxClick(option)}
                                ></div>
                                <textarea
                                    name={option}
                                    placeholder={`Option ${index + 1}`}
                                    className="h-14 w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                    value={formData[option]}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                        }
                                    }}
                                ></textarea>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="h-10 w-20 bg-blue-500 m-4 text-white"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="h-10 w-20 bg-green-500 m-4 text-white"
                        onClick={() => {
                            console.log(formData); // Log form data
                            addDiv(); // Call addDiv function
                        }}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="h-10 w-20 bg-red-500 m-4 text-white"
                        onClick={() => removeDiv(divId)}
                    >
                        Remove
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Question;