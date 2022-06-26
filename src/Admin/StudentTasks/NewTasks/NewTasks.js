import Header from "../../Header/Header";
import "./NewTasks.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
function NewTasks(){
    const token =localStorage.getItem("adminToken");
    const [tasksarr,setTasksArr]=useState([]);
    const newTasksUrl=process.env.REACT_APP_ADMIN_STUDENT_NEW_TASKS;
    useEffect(()=>{
        axios.get(newTasksUrl,{
            headers:{
                "auth-token": token
            }
        }).then((response)=>{
            console.log(response.data);
            setTasksArr(response.data);
        }).catch((err)=>{
            console.log(err);
        })
     },[]);
    return( 
        <>
        <Header/>
        <div className="admin-new-tasks-outer">
            <h1 className="admin-new-tasks-header">New Tasks</h1>
            <div className="admin-new-tasks-inner">
                {
                    tasksarr.length===0 ? <h2 className="admin-no-new-tasks"> No New Tasks Found</h2>:  tasksarr.map((details)=>(<TaskList details={details}/> ))
                    
                }
            </div>
        </div>
        </>
    )
}


export default NewTasks;