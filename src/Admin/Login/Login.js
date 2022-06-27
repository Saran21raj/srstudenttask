import {useState} from 'react';
import Axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';

function AdminLogin(){
    const [adminLoginValues,setAdminLoginValues]=useState({
        userName:'',
        password:''
    });
    const loginUrl=process.env.REACT_APP_ADMIN_LOGIN;
    const navigate=useNavigate();
    const [misMatchErr,setMisMatchErr]=useState(true);
    const [testValue,setTestValue]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setAdminLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const [loginErr,setLoginErr]=useState("Username & Password Doesn't Match")
    const [isLoading,setIsLoading]=useState(true);
    const handleSubmit =(event)=>{
        if(adminLoginValues.userName!==''&& adminLoginValues.password!=='')
        {
        setIsLoading(false);
        event.preventDefault();
            // Axios request to Login into the user Account
            Axios.post(loginUrl,{
                userName:adminLoginValues.userName,
                password:adminLoginValues.password}).then((response)=>{
                    setIsLoading(true);
                    const adminToken=response.data.token;
                    const userName=response.data.userName;
                    const name=response.data.name;
                    localStorage.setItem('adminName',name);
                    localStorage.setItem('adminToken',adminToken);
                    localStorage.setItem("adminUserName",userName);
                    setAdminLoginValues({userName:"",password:""});
                    if(response.status===200){
                        navigate("/admin/intro");
                    }
                }).catch((err)=>{
                    setIsLoading(true);
                    if(err.response.status===400){
                        setLoginErr("User Doesn't Exits");
                        setMisMatchErr(false);
                    }
                    if(err.response.status===403){
                        setLoginErr("Username & Password Doesn't Match");
                        setMisMatchErr(false);
                    }
                    console.log(err);
            })
        }
        else{
            setLoginErr("Please Fill details");
            setMisMatchErr(false);
        }
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
                            <h1 className='login-label'>Admin Login</h1>
                            <input 
                                name="userName"
                                type="text"
                                placeholder='Username'
                                value={adminLoginValues.userName}
                                className='login-editbox'
                                onChange={handleChange}/>
                            <input 
                                name="password"
                                type="password"
                                value={adminLoginValues.password}
                                className='login-editbox'
                                placeholder='Password'
                                onChange={handleChange}/>
                            <h4 className='login-label-err'disabled={misMatchErr}>{loginErr}</h4>
                            <button className='login-button' onClick={handleSubmit}>Login</button>
                            <div className='loader-login' disabled={isLoading}>
                                <Loader/>
                            </div>
                            <Link to="/student/login" className='student-login-label'><h4 className='student-login-label'>Student Login</h4></Link>
                            <div className='login-test-values'>
                                <p className='test-value-heading' onClick={handleTestValues}>Show test values</p>
                                <p className='test-values' disabled={testValue}>Username: test1@123</p>
                                <p className='test-values' disabled={testValue}>Password: test1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AdminLogin;