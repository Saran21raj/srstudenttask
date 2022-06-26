import { useState } from "react";
import Header from "../Header/Header";
import "./ResetPassword.css";
import Axios from "axios";
function StudentResetPassword(){
    const studentName=localStorage.getItem("studentName");
    const [password,setPassword]=useState({
        newPassword:"",
        confirmPassword:""
    });
    const token=localStorage.getItem("studentToken");
    const [success,setSuccess]=useState(true);
    const [misMatchErr,setMisMatchErr]=useState(true);
    const resetPasswordUrl=process.env.REACT_APP_STUDENT_RESET_PASSWORD;
    const regNo=localStorage.getItem("regNo");
    const handleChange=({target:{name,value}})=>{
        setSuccess(true);
        setMisMatchErr(true);
        setPassword(prevState=>({...prevState,[name]:value}));
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(password.newPassword===password.confirmPassword){
            Axios.post(resetPasswordUrl,{
                studentRegNo:regNo,
                newPassword:password.confirmPassword},{
                    headers:{
                        "auth-token": token
                    }
                }).then((response)=>{
                 if(response.status===200){
                    setSuccess(false);
                 }
                }).catch((err)=>{
                    console.log(err);
            })
        }
        else{
            setMisMatchErr(false);
        }
    }
    return(
        <>
        <Header/>
        <h1 className="student-reset-label">Welcome {studentName}</h1>
        <div className="student-resetpass-outer-container">
            <p className="password-label">Reset Password</p>
            <div className="student-resetpass-pass-container">
                <p className="password-label">New password </p>
                <input 
                    name="newPassword"
                    type="password"
                    placeholder='Password'
                    value={password.newPassword}
                    className='student-resetpass-editbox'
                    onChange={handleChange}/>
                    <p className="student-resetpass-mis" disabled={misMatchErr}>Password Mismatch</p>
            </div>
            <div className="student-resetpass-pass-container">
                <p className="password-label">Confirm password </p>
                <input 
                    name="confirmPassword"
                    type="text"
                    placeholder='Password'
                    value={password.confirmPassword}
                    className='student-resetpass-editbox'
                    onChange={handleChange}/>
                <button className="student-resetpass-submit-btn" onClick={handleSubmit}>Submit</button>
                <p className="student-resetpass-succ" disabled={success}>Password Updated</p>
            </div>
        </div>
        </>
    )
}

export default StudentResetPassword