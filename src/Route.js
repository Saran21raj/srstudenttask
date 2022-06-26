import {BrowserRouter,Route,Routes} from "react-router-dom"
import StudentAccountCreation from "./Admin/AccountCreation/StudentAccountCreation/StudentAccountCreation";
import AdminLogin from "./Admin/Login/Login"
import StudentLogin from "./Student/Login/Login";
import StudentResetPassword from "./Student/ResetPassword/StudentResetPassword";
import AdminAccountCreation from "./Admin/AccountCreation/AdminAccountCreation/AdminAccountCreation";
import AccountCreation from "./Admin/AccountCreation/AccountCreation";
import AdminResetPassword from "./Admin/ResetPassword/AdminResetPassword";
import AdminIntro from "./Admin/AdminIntro/AdminIntro";
import StudentIntro from "./Student/StudentIntro/StudentIntro";
import StudentTasks from "./Admin/StudentTasks/StudentTasks";
import UpdateTopic from "./Admin/StudentTasks/UpdateTopic/UpdateTopic";
import OldTopic from "./Admin/StudentTasks/Old Topics/OldTopics";
import TaskIntro from "./Student/Tasks/TaskIntro";
import SubmitNewTask from "./Student/Tasks/NewTask/NewTask";
import ViewOldTask from "./Student/Tasks/OldTask/OldTask";
import NewTasks from "./Admin/StudentTasks/NewTasks/NewTasks";
import OldTasks from "./Admin/StudentTasks/OldTasks/OldTasks";
function AdminPrivateRoute({ children }){
    const token=localStorage.getItem("adminToken");
    if(token){
        return children;
    }
    else{
        return <AdminLogin/>
    }
}
function StudentPrivateRoute({ children }){
    const token=localStorage.getItem("studentToken");
    if(token){
        return children;
    }
    else{
        return <StudentLogin/>
    }
}
function RoutingPage(){

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    <Route path="/admin/intro" element={ <AdminIntro/> }/>
                    <Route path="/admin/accountcreationintro"element={<AdminPrivateRoute> <AccountCreation/> </AdminPrivateRoute> }/>
                    <Route path="/admin/updatetopic" element={<AdminPrivateRoute> <UpdateTopic/> </AdminPrivateRoute>}/>
                    <Route path="/admin/oldtopic" element={<AdminPrivateRoute> <OldTopic/> </AdminPrivateRoute>}/>
                    <Route path="/admin/tasks" element={<AdminPrivateRoute> <StudentTasks/> </AdminPrivateRoute>}/>
                    <Route path="/admin/newtasks" element={<AdminPrivateRoute> <NewTasks/> </AdminPrivateRoute>}/>
                    <Route path="/admin/oldtasks" element={<AdminPrivateRoute> <OldTasks/> </AdminPrivateRoute>}/>
                    <Route path="/admin/adminaccountcreation" element={<AdminPrivateRoute> <AdminAccountCreation/> </AdminPrivateRoute>}/>
                    <Route path="/admin/studentaccountcreation" element={<AdminPrivateRoute> <StudentAccountCreation/> </AdminPrivateRoute> }/>
                    <Route path="/admin/resetpassword" element={<AdminPrivateRoute> <AdminResetPassword/> </AdminPrivateRoute> }/>\
                    <Route path="/student/login" element={<StudentLogin/>}/>
                    <Route path="/student/resetpassword" element={<StudentPrivateRoute> <StudentResetPassword/> </StudentPrivateRoute> }/>
                    <Route path="/student/intro" element={<StudentIntro/>}/>
                    <Route path="/student/taskintro" element={<StudentPrivateRoute> <TaskIntro/> </StudentPrivateRoute> }/>
                    <Route path="/student/submitnewtask" element={<StudentPrivateRoute> <SubmitNewTask/> </StudentPrivateRoute> }/>
                    <Route path="/student/viewoldtask" element={<StudentPrivateRoute> <ViewOldTask/> </StudentPrivateRoute> }/>
                    <Route path="*" element={<AdminLogin/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default RoutingPage;