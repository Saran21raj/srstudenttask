import {useState} from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function StudentLogin(){
    const [studentLoginValues,setStudentLoginValues]=useState({
        userName:'',
        password:''
    })
    const loginUrl=process.env.REACT_APP_STUDENT_LOGIN;
    const navigate=useNavigate();
    const [misMatchErr,setMisMatchErr]=useState(true);
    const [testValue,setTestValue]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setStudentLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
            //Axios request to Login into the user Account
            Axios.post(loginUrl,{
                userName:studentLoginValues.userName,
                password:studentLoginValues.password}).then((response)=>{
                    const studentToken=response.data.token;
                    const regNo=response.data.regNo;
                    const studentName=response.data.name;
                    localStorage.setItem('studentToken',studentToken);
                    localStorage.setItem('regNo',regNo);
                    localStorage.setItem('studentName',studentName);
                    setStudentLoginValues({userName:"",password:""})
                    if(response.status===200){
                        navigate("/student/intro");
                    }
                }).catch((err)=>{
                    if(err.response.status===403){
                        setMisMatchErr(false);
                    }
            })
    };
    const handleTestValues=()=>{
        if(testValue){
            setTestValue(false);
        }
        else{
            setTestValue(true);
        }
    }
    return(
        <>
        <div className="outerbox">
                <div className="innerbox-left">
                    <div className="title">
                        <h1>Student </h1>
                        <h1>Task Submission</h1>
                        <h1>Application</h1>
                    </div>
                </div>
                <div className="innerbox-right">
                    <div className='mobile-heading'>
                        <p className='mobile-title'>Student Task Submission Application</p>
                    </div>
                    <div className="right-container">
                        <div className='loginInnerContainer'>
                            <h1 className='login-label'>Student Login</h1>
                            <input 
                                name="userName"
                                type="text"
                                placeholder='Username'
                                value={studentLoginValues.userName}
                                className='login-editbox'
                                onChange={handleChange}/>
                            <input 
                                name="password"
                                type="password"
                                value={studentLoginValues.password}
                                className='login-editbox'
                                placeholder='Password'
                                onChange={handleChange}/>
                            <h4 className='login-label-err'disabled={misMatchErr}>Username & Password Doesn't Match</h4>
                            <button className='login-button' onClick={handleSubmit}>Login</button>
                            <Link to="/admin/login" className='student-login-label'> <h4 className='student-login-label'>Admin Login</h4></Link>
                            <div className='login-test-values'>
                                <p className='test-value-heading' onClick={handleTestValues}>Show test values</p>
                                <p className='test-values' disabled={testValue}>Username: student1@123</p>
                                <p className='test-values' disabled={testValue}>Password: test</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default StudentLogin