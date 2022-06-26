
import { useState } from "react";
import Header from "../../Header/Header";
import axios  from "axios";
import "./OldTask.css";
function ViewOldTask(){
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    const regNo=localStorage.getItem("regNo");
    const token =localStorage.getItem("studentToken");
    const getTaskUrl=process.env.REACT_APP_STUDENT_GET_OLD_TASK;
    const [taskDetails,setTaskDetails]=useState({
        date: ""
    })
    const [taskdetailsarr,setTaskDetailsarr]=useState({
        date:"",
        regNo:"",
        topic:"",
        taskUrl:"",
        isVerified:"",
        feedBack:"Not Updated",
    });
    const handleChange=({target:{name,value}})=>{
        setTaskDetails(prevState=>({...prevState,[name]:value}));
    }
    const handleClose=()=>{
        var close=document.getElementById("taskdetails-modal");
        close.style.display="none";
    }
    const handleModal=()=>{
        var open=document.getElementById("taskdetails-modal");
        open.style.display="flex";
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(getTaskUrl,{
            date:taskDetails.date,
            regNo:regNo
        },{
            headers:{
                "auth-token":token
            }
        }).then((response)=>{
            console.log(response);
            const records=document.getElementById("records");
            records.style.display="flex";
            const date=document.getElementById("old-date");
            date.style.display="none";
            const noRecords=document.getElementById("no-records");
            noRecords.style.display="none";
            setTaskDetailsarr({
                date:response.data[0].date,
                topic:response.data[0].topic,
                regNo:response.data[0].regNo,
                taskUrl:response.data[0].taskUrl,
                isVerified:response.data[0].isVerified,
                feedBack:response.data[0].feedBack
            });
        }).catch((err)=>{
            if(err.response.status===400){
                const noRecords=document.getElementById("no-records");
                noRecords.style.display="flex";
                const records=document.getElementById("records");
                records.style.display="none";
                const date=document.getElementById("old-date");
                date.style.display="none";
                console.log("No records Found")
            }
        })
    }
    return(
        <>
         <Header/>
        <div className="old-task-outer">
            <h1 className="old-task-header">View Old Task</h1>
            <div className="old-task-date-div">
                    <h1 className="new-task-date-side-header">Date :</h1>
                    <input type="date" value={taskDetails.date} max={date} className="old-task-topic-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                    <button onClick={handleSubmit} className="old-task-topic-button">Submit</button>
            </div>
            <div className="old-task-records">
                <h1 className="old-task-header">Tasks</h1>
                <h1 className="old-task-header-date" id="old-date">Please Select Date</h1>
                <h1 className="old-task-header-topic" id="no-records">No Records Found</h1>
                <div className="old-task-details-outer"  id="records">
                    <div className="old-task-details-inner" onClick={handleModal} id="records">
                        <div className="old-task-details-inner-details">
                            <h3 className="old-task-details-header">RegNo:</h3>
                            <h3 className="old-task-details-header">{taskdetailsarr.regNo}</h3>
                        </div>
                        <div className="old-task-details-inner-details">
                            <h3 className="old-task-details-header">Date :</h3>
                            <h3 className="old-task-details-header">{taskdetailsarr.date}</h3>
                        </div>
                        <div className="old-task-details-inner-details">
                            <h3 className="old-task-details-header">Topic :</h3>
                            <h3 className="old-task-details-header">{taskdetailsarr.topic}</h3>
                        </div>
                    </div>
                </div>
                <div className="old-task-details-modal-outer" id="taskdetails-modal">
                    <div className="old-task-details-modal-inner">
                    <span className="close" onClick={handleClose}>&times;</span>
                        <h1 className="old-task-modal-heading">Task Details</h1>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Date :</h2>
                            <h2 className="old-task-modal-side-heading">{taskdetailsarr.date}</h2>
                            <h2 className="old-task-modal-side-heading">RegNo :</h2>
                            <h2 className="old-task-modal-side-heading">{taskdetailsarr.regNo}</h2>
                        </div>
                        <div className="old-task-modal-inner">
                            <h2 className="old-task-modal-side-heading">Topic :</h2>
                            <h2 className="old-task-modal-side-heading">{taskdetailsarr.topic}</h2>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Task Url :</h2>
                                <input  defaultValue={taskdetailsarr.taskUrl} className="old-task-modal-task-url" readOnly/>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <a className="old-task-details-button" href={taskdetailsarr.taskUrl}  target="_blank" rel="noreferrer"><button className="open-url-button">Open Url</button></a>
                            </div>
                        </div>
                        <div className="old-task-modal-inner-task">
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Verification Done :</h2>
                                <h2 className="old-task-modal-side-heading">{taskdetailsarr.isVerified}</h2>
                            </div>
                            <div className="old-task-modal-details-inner">
                                <h2 className="old-task-modal-side-heading">Feedback :</h2>
                                <h2 className="old-task-modal-side-heading">{taskdetailsarr.feedBack}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewOldTask;