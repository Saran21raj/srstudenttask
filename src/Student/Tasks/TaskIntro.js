import Header from "../Header/Header";
import taskImg from "../../Images/task.svg";
import { Link } from "react-router-dom";


function TaskIntro(){
    const studentName=localStorage.getItem("studentName");
    return(
    <>
        <Header/>
        <h1 className="student-reset-label">Welcome {studentName}</h1>
        <div className="adminIntro-outer-container">
            <div className="adminIntro-inner-container">
                <div className="adminIntro-option">
                    <Link to="/student/submitnewtask" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={taskImg} alt="account-creation" className="student-image"/>
                            <p className="admin-intro-header">Submit New Task</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/student/viewoldtask" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={taskImg} alt="attendance" className="student-image"/>
                            <p className="admin-intro-header">View Old Tasks</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}


export default TaskIntro