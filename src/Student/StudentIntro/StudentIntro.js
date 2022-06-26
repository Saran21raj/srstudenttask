import Header from "../Header/Header";
import "./StudentIntro.css";
import passwordImg from "../../Images/password.svg";
import { useEffect } from "react";
import taskImg from "../../Images/task.svg";
import { Link } from "react-router-dom";


function StudentIntro(){
    const studentName=localStorage.getItem("studentName");
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
  },[]);
    })
    return(
    <>
        <Header/>
        <h1 className="student-reset-label">Welcome {studentName}</h1>
        <div className="adminIntro-outer-container">
            <div className="adminIntro-inner-container">
                <div className="adminIntro-option">
                    <Link to="/student/resetpassword" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={passwordImg} alt="account-creation" className="student-image"/>
                            <p className="admin-intro-header">Reset Password</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/student/taskintro" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={taskImg} alt="attendance" className="student-image"/>
                            <p className="admin-intro-header">Tasks</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}


export default StudentIntro