
import { useState } from "react";
import Header from "../../Header/Header";
import axios  from "axios";
import "./OldTopics.css";
function OldTopic(){
    const [topicDetails,setTopicDetails]=useState({
        date:"",
        topic:"Please Select Date"
    })
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    const oldTopicUrl=process.env.REACT_APP_ADMIN_STUDENT_TASK_OLD_TOPIC;
    const handleChange=({target:{name,value}})=>{
        setTopicDetails({ topic:"Please Select Date"});
        setTopicDetails(prevState=>({...prevState,[name]:value}));
    }
    const token=localStorage.getItem("adminToken");
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(topicDetails.date!==""){
            axios.post(oldTopicUrl,{
                date:topicDetails.date
            },{
                    headers: {
                    "auth-token": token
                }
                }).then((response)=>{
                    if(response.status===200){
                        // setTopicDetails({date:"",topic:""});
                        console.log(response.data);
                        console.log("topic",response.data.topic);
                        setTopicDetails({topic:response.data.topic});
                    }
                   
                }).catch((err)=>{
                    if(err.response.status===400){
                        setTopicDetails({topic:"Topic Not Updated"});
                    }
                })
        }
        else{
            console.log("please enter details");
        }
        console.log(topicDetails.date);
    }
    return(
        <>
         <Header/>
        <div className="update-topic-outer">
            <h1 className="update-header">View Old Topic</h1>
            <div className="old-date-div">
                <h1 className="old-date-header">Date :</h1>
                <input type="date" value={topicDetails.date} className="update-topic-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                <button onClick={handleSubmit} className="old-topic-button">Submit</button>
            </div>
            <div className="update-topic-div">
                <h1 className="old-date-header">Topic : </h1>
                <h1 className="old-err">{topicDetails.topic}</h1>
            </div>
        </div>
        </>
    )
}

export default OldTopic