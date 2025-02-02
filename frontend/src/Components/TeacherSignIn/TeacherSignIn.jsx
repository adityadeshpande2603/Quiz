import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const TeacherSignIn = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Log the form data (you can use this for API calls or validation)
        console.log(formData);



        try {
            const res = await axios.post("http://localhost:3000/api/auth/teacher/login", {
                email: formData.email, 
                password: formData.password, 
            }, {
                withCredentials: true,  // This ensures the cookie is sent
            });
            console.log(res);
            navigate("/teacher/homepage");
        } catch (err) {
            console.error(err); // Log the entire error

        }
    };


    return (
        <div>
            <form action="" onSubmit={handleSubmit} className="text-black flex flex-col border-2 border-black p-4 backdrop-blur-md bg-white/30">

                <div className="flex justify-between mb-4">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" className="border-2 border-gray-300 p-2"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex justify-between mb-4">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" className="border-2 border-gray-300 p-2"
                        value={formData.password}
                        onChange={handleInputChange} />
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