
import {useState,useEffect} from 'react';
import Axios from 'axios';
import Header from '../../Header/Header';

function AdminAccountCreation(){
    const token=localStorage.getItem("adminToken");
    const [adminValues,setAdminValues]=useState({
        name:'',
        userName:'',
        password:''
    });
    const accountListUrl=process.env.REACT_APP_ADMIN_ACCOUNT_LIST;
    const accountCreationUrl=process.env.REACT_APP_ADMIN_ACCOUNT_CREATION;
    const [arr,setarr]=useState([]);
    const [load,setLoad]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setAdminValues(prevState=>({...prevState,[name]:value}))
    }
    useEffect(()=>{
        Axios.get(accountListUrl,{
            headers: {
            "auth-token": token
        }
        }).then((response)=>{
            setarr(response.data);
            if(response.data.length==0){
                setLoad(false);
            }
        })
     },[])
    const handleSubmit =(event)=>{
        event.preventDefault();
            //Axios request to Login into the user Account
            if(adminValues.name!=='' && adminValues.userName!==''&& adminValues.password!=='')
            {
                Axios.post(accountCreationUrl,{
                name:adminValues.name,
                userName:adminValues.userName,
                password:adminValues.password},{
                    // headers: {
                    //     "auth-token": token
                    // }
                }).then((response)=>{
                    if(response.status===200){
                        setAdminValues({name:"",userName:"",password:""});
                        console.log("Account Created")
                    }
                }).catch((err)=>{
                    if(err.response.status===403){
                        console.log("error");
                    }
            })
            }
            else{
                alert("Please Update Details");
            }
            
    };
    return(
    <>
        <Header/>
        <div className='admin-account-creation-outer-container'>
            <div className='admin-account-creation-inner-container1'>
                <h4 className='admin-account-creation-label'>Name </h4>
                <input 
                    name="name"
                    type="text"
                    placeholder='Name'
                    value={adminValues.name}
                    className='admin-account-creation-editbox'
                    onChange={handleChange}/>
                <h4 className='admin-account-creation-label'>Username </h4>
                <input 
                    name="userName"
                    type="text"
                    placeholder='Username'
                    value={adminValues.userName}
                    className='admin-account-creation-editbox'
                    onChange={handleChange}/>
                <h4 className='admin-account-creation-label'>Password </h4>
                <input 
                    name="password"
                    type="password"
                    value={adminValues.password}
                    className='admin-account-creation-editbox'
                    placeholder='Password'
                    onChange={handleChange}/>
                <button className='admin-account-creation-button' onClick={handleSubmit}>Create Account</button>
            </div>
            <p className='admin-records'>Admin Records</p>
            <div className='admin-account-creation-inner-container2'>
                <table className="accountCreation-table" >
                    <tr className="leaveStatus-table-row">
                        <th className="leaveStatus-table-header">Name</th>
                        <th className="leaveStatus-table-header">Username</th>
                    </tr>
                    {arr.map((list)=>(
                        <tr className="leaveStatus-table-row">
                            <td className="leaveStatus-table-data"> {list.name} </td>
                            <td className="leaveStatus-table-data"> {list.userName} </td>
                        </tr>
                    ))}
                </table>
                <p className='admin-records' disabled={load}>No Records Found</p>

            </div>
        </div>
    </>
    )
}

export default AdminAccountCreation;