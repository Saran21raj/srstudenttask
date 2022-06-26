import axios from "axios";
import { useState } from "react";
import "./OldTaskList.css";
function OldTaskList(props){
    const [deletedMsg,setDeletedMsg]=useState(true);
    const handleModal=(userId)=>{
        let open=document.getElementById(userId);
        open.style.display="flex";
    }
    const deleteTaskUrl=process.env.REACT_APP_ADMIN_STUDENT_DELETE_TASK;
    const token =localStorage.getItem("adminToken");
    const handleClose=(userId)=>{
        let close=document.getElementById(userId);
        close.style.display="none";
    }
    const handleSubmit=()=>{
        axios.delete(deleteTaskUrl,{
            headers:{
                "auth-token":token
            },
            data:{_id: props.details._id}
        }).then((response)=>{
            console.log(response);
            if(response.status===200){
                setDeletedMsg(false);
                setTimeout(()=>{
                    let deleteTask=document.getElementById(props.details._id);
                    let deleteTaskModal=document.getElementById(`${props.details._id}-modal`);
                    deleteTask.parentNode.removeChild(deleteTask);
                    deleteTaskModal.parentNode.removeChild(deleteTaskModal);
                },2000);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <div className="old-task-student-task-list-outer" onClick={()=>handleModal(`${props.details._id}-modal`)} id={props.details._id}>
            <div className="student-task-list-inner">
                <h2 className="student-task-list-header">RegNo:</h2>
                <h2 className="student-task-list-header">{props.details.regNo}</h2>
            </div>
            <div className="student-task-list-inner">
                <h2 className="student-task-list-header">Date:</h2>
                <h2 className="student-task-list-header">{props.details.date}</h2>
            </div>
            
        </div>
        <div className="student-task-list-modal" id={`${props.details._id}-modal`}>
        <div className="old-task-details-modal-inner">
                    <span className="close" onClick={()=>handleClose(`${props.details._id}-modal`)}>&times;</span>
                        <h1 className="old-task-modal-heading">Task Details</h1>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Date :</h2>
                            <h2 className="old-task-modal-side-heading">{props.details.date}</h2>
                            <h2 className="old-task-modal-side-heading">RegNo :</h2>
                            <h2 className="old-task-modal-side-heading">{props.details.regNo}</h2>
                        </div>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Topic :</h2>
                            <h2 className="old-task-modal-side-heading">{props.details.topic}</h2>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Task Url :</h2>
                                <input  defaultValue={props.details.taskUrl} className="old-task-modal-task-url" readOnly/>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <a className="old-task-details-button" href={props.details.taskUrl}  target="_blank" rel="noreferrer"><button className="open-url-button">Open Url</button></a>
                            </div>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Verification Done :</h2>
                                <h2 className="old-task-modal-side-heading">{props.details.isVerified}</h2>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Feedback :</h2>
                                <h2 className="old-task-modal-side-heading">{props.details.feedBack}</h2>
                            </div>
                        </div>
                        <div className="new-task-modal-inner-submit">
                            <button id="feedback-submit" className="new-task-submit" onClick={handleSubmit}>Delete</button>
                            <h4 style={{color:"#F55353"}} disabled={deletedMsg}>Deleted</h4>
                        </div>
                    </div>
        </div>
        </>
    )
}

export default OldTaskList;