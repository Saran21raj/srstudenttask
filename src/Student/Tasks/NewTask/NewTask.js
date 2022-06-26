
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import axios  from "axios";
import "./NewTask.css";
function SubmitNewTask(){
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    const regNo=localStorage.getItem("regNo");
    const token =localStorage.getItem("studentToken");
    const [topicsArr,setTopicsArr]=useState([]);
    const [taskDetails,setTaskDetails]=useState({
        date: "",
        taskUrl:"",
        topic:"Please Select Date"
    })
    const taskTopicUrl=process.env.REACT_APP_STUDENT_TASK_TOPICS;
    const submitTaskUrl=process.env.REACT_APP_STUDENT_SUBMIT_TASK;
    useEffect(()=>{
        axios.get(taskTopicUrl,{
            headers:{
                "auth-token": token
            }
        }).then((response)=>{
            console.log(response.data);
            setTopicsArr(response.data);
        })
     },[]);
    const handleChange=({target:{name,value}})=>{
        setUpdateErr(true);
        setUpdateSucc(true);
        setUpdateErrDate(true);
        setTopicErr(true);
        if(name==="date"){
            for(let i=0;i<topicsArr.length;i++){
                if(value===topicsArr[i].date){
                    setTaskDetails(prevState=>({...prevState,topic:topicsArr[i].topic}));
                    break;
                }
                else{
                    setTaskDetails(prevState=>({...prevState,topic:"Topic Not Updated"}));
                }
            }
        }
        setTaskDetails(prevState=>({...prevState,[name]:value}));
    }
    const [updateErr,setUpdateErr]=useState(true);
    const [updateSucc,setUpdateSucc]=useState(true);
    const [updateErrDate, setUpdateErrDate]=useState(true);
    const [topicerr,setTopicErr]=useState(true);
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log("url",taskDetails.taskUrl);
        if(taskDetails.topic!=="Topic Not Updated"){
            if(taskDetails.taskUrl!==""){
                axios.post(submitTaskUrl,{
                    date:taskDetails.date,
                    topic:taskDetails.topic,
                    taskUrl:taskDetails.taskUrl,
                    regNo:regNo,
                },{
                    headers: {
                    "auth-token": token
                }
                }).then((response)=>{
                    if(response.status===200){
                        setUpdateSucc(false);
                        setTaskDetails({date:"",taskUrl:"",topic:"Please Select Date"});
                    }
                }).catch((err)=>{
                    if(err.response.status===400)
                    {
                        setTaskDetails(prevState=>({...prevState,taskUrl:""}));
                        setUpdateErrDate(false);
                    }
                    console.log(err);
                })
            }
            else{
                setUpdateErr(false);
            }
        }
        else{
            setTopicErr(false);
        }
    }
    return(
        <>
         <Header/>
        <div className="new-task-outer">
            <h1 className="new-task-header">Submit Task</h1>
            <div className="new-task-date-div">
                <div className="new-task-date-div-inner">
                    <h1 className="new-task-date-side-header">Date :</h1>
                    <input type="date" value={taskDetails.date} max={date} className="new-task-topic-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                </div>
                <div className="new-task-date-div-inner-err">
                <h4 disabled={updateSucc} className="new-task-status">Submitted</h4>
                <h4 disabled={updateErrDate} className="new-task-err">Task Already Submitted On Selected Date</h4>
                </div>
            </div>
            <div className="new-task-topic-div-topic">
                <div className="new-task-topic-div-inner">
                    <h1 className="new-task-date-side-header">Topic :</h1>
                    <h1 className="new-task-topic">{taskDetails.topic}</h1>
                </div>
                <h4 className="new-task-err" disabled={topicerr}>Topic Not Updated</h4>
            </div>
            <div className="new-task-topic-div">
                <h1 className="new-task-date-side-header">Task Url :</h1>
                <input type="text" value={taskDetails.taskUrl} className="new-task-topic-editbox" onChange={handleChange} placeholder="Url" name="taskUrl"/>
            </div>
            <div className="new-task-button-div">
                <button onClick={handleSubmit} className="new-task-topic-button">Submit</button>
                <h4 className="new-task-err" disabled={updateErr}>Please Fill Task Url</h4>
            </div>
        </div>
        </>
    )
}

export default SubmitNewTask