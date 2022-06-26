
import { useState } from "react";
import Header from "../../Header/Header";
import axios  from "axios";
import "./UpdateTopic.css";
function UpdateTopic(){
    const [topicDetails,setTopicDetails]=useState({
        date:"",
        topic:""
    })
    const updateTopicUrl=process.env.REACT_APP_ADMIN_STUDENT_TASK_TOPIC_UPDATE;
    const handleChange=({target:{name,value}})=>{
        setUpdateErr(true);
        setUpdateSucc(true);
        setUpdateErrDate(true);
        setTopicDetails(prevState=>({...prevState,[name]:value}));
    }
    const token=localStorage.getItem("adminToken");
    const [updateErr,setUpdateErr]=useState(true);
    const [updateSucc,setUpdateSucc]=useState(true);
    const [updateErrDate, setUpdateErrDate]=useState(true);
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(topicDetails.date!==""&&topicDetails.topic!==""){
            axios.post(updateTopicUrl,{
                    date:topicDetails.date,
                    topic:topicDetails.topic
                },{
                    headers: {
                    "auth-token": token
                }
                }).then((response)=>{
                    if(response.status===200){
                        setUpdateSucc(false);
                        setTopicDetails({date:"",topic:""});
                    }
                    
                }).catch((err)=>{
                    if(err.response.status===400){
                        setUpdateErrDate(false);
                    }
                })
        }
        else{
            setUpdateErr(false);
        }
        // console.log(topicDetails.date);
    }
    // min={new Date().toISOString().split('T')[0]}
    return(
        <>
         <Header/>
        <div className="update-topic-outer">
            <h1 className="update-header">Update Topics</h1>
            <div className="update-date-div">
                <div className="update-date-div-inner">
                    <h1 className="update-date-side-header">Date</h1>
                    <input type="date" value={topicDetails.date}  className="update-topic-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                </div>
                <div className="update-date-div-inner-err">
                <h4 disabled={updateSucc}>Submitted</h4>
                <h4 disabled={updateErrDate} className="update-err">Topic Already Updated On Selected Date</h4>
                </div>
            </div>
            <div className="update-topic-div">
                <h1 className="update-date-side-header">Topic</h1>
                <input type="text" value={topicDetails.topic} className="update-topic-editbox" onChange={handleChange} placeholder="Topic" name="topic"/>
            </div>
            <div className="update-button-div">
                <button onClick={handleSubmit} className="update-topic-button">Submit</button>
                <h4 className="update-err" disabled={updateErr}>Please Fill topic</h4>
            </div>
        </div>
        </>
    )
}

export default UpdateTopic