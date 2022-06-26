import Header from "../Header/Header";
import "./AdminIntro.css";
import passwordImg from "../../Images/password.svg";
import { useEffect } from "react";
import taskImg from "../../Images/task.svg";
import accountCreation from "../../Images/account.svg";
import { Link } from "react-router-dom";

 
function AdminIntro(){
    const name=localStorage.getItem("adminName");
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
  },[]);
    })
    return(
    <>
        <Header/>
        <div className="adminIntro-outer-container">
            <h1 className="student-reset-label">Welcome {name}</h1>
            <div className="adminIntro-inner-container">
                <div className="adminIntro-option">
                    <Link to="/admin/accountcreationintro" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={accountCreation} alt="account-creation" className="student-image"/>
                            <p className="admin-intro-header">Account Creation</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/admin/resetpassword" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={passwordImg} alt="account-creation" className="student-image"/>
                            <p className="admin-intro-header">Reset Password</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/admin/tasks" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={taskImg} alt="attendance" className="student-image"/>
                            <p className="admin-intro-header">Student Tasks</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}


export default AdminIntro