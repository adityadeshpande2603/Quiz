import { Link } from "react-router-dom";

const TeacherStudentCard = () => {
    return (
        <div>
            
            <div className="role flex items-center justify-center space-x-5 mt-8">
            <Link to="/teacher/register">
                <div className="teacher h-80 w-80 backdrop-blur-md bg-white/30 hover:size-96 flex flex-col items-center justify-center text-white text-2xl">
                    <img src="/teacher.jpg" alt="" className="h-52 " />
                    <div className="font-bold">Teacher</div>

                </div>
                </Link>
                <div className="student h-80 w-80 backdrop-blur-md bg-white/30  flex flex-col hover:size-96 items-center justify-center text-white text-2xl">
                    <img src="/student.jpg" alt="" className="h-52 w-52" />
                    <div className="font-bold">Student</div>
                </div>
            </div>
            
        </div>
    )

}

export default TeacherStudentCard;