import Header from "../Header/Header";
import taskImg from "../../Images/task.svg";
import topicImg from "../../Images/topics.svg";
import "./StudentTasks.css";
import { Link } from "react-router-dom";
function StudentTasks(){
    
    return(
        <>
        <Header/>
            <div className="adminIntro-outer-container">
            <h1 className="admin-student-tasks-header">Student Tasks</h1>
                <div className="adminIntro-inner-container">
                    <div className="adminIntro-option">
                        <Link to="/admin/newtasks" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={taskImg} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">New Tasks</p >
                            </div>
                        </Link>
                    </div>
                    <div className="adminIntro-option">
                        <Link to="/admin/oldtasks" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={taskImg} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">Old Tasks</p >
                            </div>
                        </Link>
                    </div>
                    <div className="adminIntro-option">
                        <Link to="/admin/updatetopic" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={topicImg} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">Update New Topic</p >
                            </div>
                        </Link>
                    </div>
                    <div className="adminIntro-option">
                        <Link to="/admin/oldtopic" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={topicImg} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">See Old Topics</p >
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default StudentTasks