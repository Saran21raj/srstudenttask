import axios from "axios";
import { useState } from "react";
import "./TaskList.css";
import doneImg from "../../../../Images/right.svg";
import notDoneImg from "../../../../Images/wrong.svg";
function TaskList(props){

    const [studentTaskDetails,SetStudentTaskDetails]=useState({
        regNo:props.details.regNo,
        date:props.details.date,
        topic:props.details.topic,
        taskUrl:props.details.taskUrl,
        isVerified:props.details.isVerified,
        feedBack:""
    });
    const [fillFeedBack,setFillFeedBack]=useState(true);
    const handleModal=(userId)=>{
        var open=document.getElementById(userId);
        open.style.display="flex";
    }
    const newTaskSubmitUrl=process.env.REACT_APP_ADMIN_STUDENT_NEW_TASK_SUBMIT;
    const token =localStorage.getItem("adminToken");
    const handleClose=(userId)=>{
        var close=document.getElementById(userId);
        close.style.display="none";
    }
    const handleChange=({target:{name,value}})=>{
        setFillFeedBack(true);
        SetStudentTaskDetails(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit=()=>{
        if(studentTaskDetails.feedBack!==""){
            axios.post(newTaskSubmitUrl,{
            _id:props.details._id,
            feedBack:studentTaskDetails.feedBack
        },{
            headers:{
                "auth-token":token
            }
        }).then((response)=>{
            console.log(response.data);
            SetStudentTaskDetails(prevState=>({...prevState, isVerified:"Yes"}));
            let editbox=document.getElementById("feedback-editbox");
            editbox.readOnly=true;
            let feedbackButton=document.getElementById("feedback-submit");
            feedbackButton.disabled=true;
        }).catch((err)=>{
            console.log(err);
        })
        }
        else{
            setFillFeedBack(false);
        }
        console.log("feedback",studentTaskDetails.feedBack);
    }
    return(
        <>
        <div className="student-task-list-outer" onClick={()=>handleModal(props.details._id)}>
            <div className="student-task-list-inner">
                <h2 className="student-task-list-header">RegNo:</h2>
                <h2 className="student-task-list-header">{studentTaskDetails.regNo}</h2>
            </div>
            <div className="student-task-list-inner">
                <h2 className="student-task-list-header">Date:</h2>
                <h2 className="student-task-list-header">{studentTaskDetails.date}</h2>
            </div>
            <div className="student-task-list-inner">
                {
                    studentTaskDetails.isVerified==="No" ? <img src={notDoneImg} alt="not-done" className="verification"/>:
                    <img src={doneImg} alt="done" className="verification"/>
                }
                
            </div>
        </div>
        <div className="student-task-list-modal" id={props.details._id}>
        <div className="old-task-details-modal-inner">
                    <span className="close" onClick={()=>handleClose(props.details._id)}>&times;</span>
                        <h1 className="old-task-modal-heading">Task Details</h1>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Date :</h2>
                            <h2 className="old-task-modal-side-heading">{studentTaskDetails.date}</h2>
                            <h2 className="old-task-modal-side-heading">RegNo :</h2>
                            <h2 className="old-task-modal-side-heading">{studentTaskDetails.regNo}</h2>
                        </div>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Topic :</h2>
                            <h2 className="old-task-modal-side-heading">{studentTaskDetails.topic}</h2>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Task Url :</h2>
                                <input  defaultValue={studentTaskDetails.taskUrl} className="old-task-modal-task-url" readOnly/>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <a className="old-task-details-button" href={studentTaskDetails.taskUrl}  target="_blank"><button className="open-url-button">Open Url</button></a>
                            </div>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Verification Done :</h2>
                                <h2 className="old-task-modal-side-heading">{studentTaskDetails.isVerified}</h2>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Feedback :</h2>
                                <input id="feedback-editbox" className="new-task-feedback-editbox" onChange={handleChange} value={studentTaskDetails.feedBack} type="text" name="feedBack"/>
                            </div>
                        </div>
                        <div className="new-task-modal-inner-submit">
                            <button id="feedback-submit" className="new-task-submit" onClick={handleSubmit}>Submit</button>
                            <h4 className="new-task-feedback-header" disabled={fillFeedBack}>Please Fill Feedback</h4>
                        </div>
                    </div>
        </div>
        </>
    )
}

export default TaskList;