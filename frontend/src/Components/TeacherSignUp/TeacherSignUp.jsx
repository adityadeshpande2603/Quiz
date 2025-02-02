import { Link } from "react-router-dom";

const TeacherSignUp = () => {

    return (

        <div>
            <form action="" className="text-black flex flex-col border-2 border-black p-4 backdrop-blur-md bg-white/30">
                <div className="flex justify-between mb-4">
                    <label htmlFor="fullName">Full Name:</label>
                    <input id="fullName" type="text" className="border-2 border-gray-300 p-2" />
                </div>
                <div className="flex justify-between mb-4">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" className="border-2 border-gray-300 p-2" />
                </div>
                <div className="flex justify-between mb-4">
                    <label htmlFor="school">School/Institute Name:</label>
                    <input id="school" type="text" className="border-2 border-gray-300 p-2" />
                </div>
                <div className="flex justify-between mb-4">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" className="border-2 border-gray-300 p-2" />
                </div>
                <div className="flex justify-between mb-4">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input id="confirmPassword" type="password" className="border-2 border-gray-300 p-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
                <div className="flex space-x-2">
                    <div>already have an account?</div>
                    <Link to="/teacher/signin">SignIn</Link>
                </div>
            </form>

        </div>
    )


}
export default TeacherSignUp;