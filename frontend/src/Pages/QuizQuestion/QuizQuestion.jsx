import { useState } from "react";
import Question from "../../Components/Question/Question";

const QuizQuestion = () => {

    const [divs, setDivs] = useState([{ id: 1 }]);

    const addDiv = () => {
        setDivs((prevDivs) => [...prevDivs, { id: prevDivs.length + 1 }]);
    };

    const removeDiv = (divIdToRemove) => {

        console.log(divIdToRemove);
        setDivs(divs.filter((div) => div.id !== divIdToRemove));
    };

    return (
        <div className="w-full p-3">
            <div className="quizName border-solid border-black border-2 w-full h-40 rounded-2xl">
                <h1 className="font-bold text-4xl my-4">Quiz Name</h1>
                <textarea
                    placeholder="Quiz Description/Instruction"
                    className="w-full h-14 p-2 border-none border-gray-300 rounded-md mt-3"
                    rows={3}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); 
                        }
                    }}
                />
            </div>

            <div className="questions overflow-auto">
                {divs.map((div) => (
                    <Question 
                        key={div.id} 
                        divId={div.id} 
                        removeDiv={removeDiv}
                        addDiv={addDiv}
                    />
                ))}
               
                <div className="flex items-center justify-center">
                    <button className="h-10 w-36 bg-blue-500 m-4" >Create Quizz</button>
                </div>

            </div>
        </div>
    );
}

export default QuizQuestion;