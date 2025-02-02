import { Link } from "react-router-dom";

const TeacherSignIn=()=>{

    return(
        <div>
        <form action="" className="text-black flex flex-col border-2 border-black p-4 backdrop-blur-md bg-white/30">
           
            <div className="flex justify-between mb-4">
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" className="border-2 border-gray-300 p-2" />
            </div>
            
            <div className="flex justify-between mb-4">
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" className="border-2 border-gray-300 p-2" />
            </div>
           
            <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
            <div className="flex space-x-2">
                <div>don't have an account?</div>
                <Link to="/teacher/register">SignUp</Link>
            </div>
        </form>

    </div>
    )

    
}

export default TeacherSignIn;