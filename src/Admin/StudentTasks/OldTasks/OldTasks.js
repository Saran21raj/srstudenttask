import Header from "../../Header/Header";
import { useState} from "react";
import axios from "axios";
import OldTaskList from "./OldTaskList/OldTaskList";
function OldTasks(){
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    const token =localStorage.getItem("adminToken");
    const [tasksarr,setTasksArr]=useState([]);
    const [taskDate,setTaskDate]=useState("");
    const [emptyArr,setEmptyArr]=useState(true);
    const oldTasksUrl=process.env.REACT_APP_ADMIN_STUDENT_OLD_TASKS;
    const handleChange=({target:{value}})=>{
        setTaskDate(value);
    };
    const [selectDate,setSelectDate]=useState("Please Select Date");
    const handleSubmit=()=>{
        console.log(date);
        axios.post(oldTasksUrl,{
            date:taskDate
        },{
            headers:{ 
                "auth-token": token
            }
        }).then((response)=>{
            setEmptyArr(false);
            setTasksArr(response.data);
        }).catch((err)=>{
            if(err.response.status===400){
                setSelectDate("No Records Found");
                setEmptyArr(true);
            }
            console.log(err);
        })
    }
    return(
        <>
        <Header/>
        <div className="admin-new-tasks-outer">
            <h1 className="admin-new-tasks-header">Old Tasks</h1>
            <div className="old-task-date-div">
                    <h1 className="new-task-date-side-header">Date :</h1>
                    <input type="date" value={taskDate} max={date} className="old-task-topic-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                    <button onClick={handleSubmit} className="old-task-topic-button">Submit</button>
            </div>
            <div className="admin-new-tasks-inner">
                {
                    emptyArr ? <h2 className="admin-no-new-tasks">{selectDate}</h2> : tasksarr.map((details)=>(<OldTaskList details={details}/> ))
                }
            </div>
        </div>
        </>
    )
}


export default OldTasks;