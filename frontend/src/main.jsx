import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage.jsx';

import TeacherStudentCard from './Components/TeacherStudentCard.jsx/TeacherStudentCard.jsx';
import TeacherSignUp from './Components/TeacherSignUp/TeacherSignUp.jsx';
import TeacherSignIn from './Components/TeacherSignIn/TeacherSignIn.jsx';
import TeacherHomePage from './Pages/TeacherHomePage/TeacherHomePage.jsx';
import CreateQuiz from './Pages/CreateQuiz/CreateQuiz.jsx';
import QuizBarGraph from './Components/QuizBarGraph/QuizBarGraph.jsx';
import QuizQuestion from './Pages/QuizQuestion/QuizQuestion.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element: <TeacherStudentCard></TeacherStudentCard>
      },
      {
        path : "/teacher/register",
        element:<TeacherSignUp></TeacherSignUp>
       
      },
      {
        path : "/teacher/signin",
        element:<TeacherSignIn></TeacherSignIn>
       
      }

    ]
  },
  {
    path:"/teacher/homepage",
    element:<TeacherHomePage></TeacherHomePage>,
    children:[
      {
        path:"/teacher/homepage/",
        element:<QuizBarGraph></QuizBarGraph>
      },
      {
        path:"/teacher/homepage/quizquestion",
        element:<QuizQuestion></QuizQuestion>
      }
      
      
    ]
  },
  {
    path:"/teacher/createquiz",
    element:<CreateQuiz></CreateQuiz>
  }

]);


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);