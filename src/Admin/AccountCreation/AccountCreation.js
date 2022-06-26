import Header from "../Header/Header";
import accountCreation from "../../Images/account.svg";
import { Link } from "react-router-dom";

function AccountCreation(){
    return(
        <>
        <Header/>
        <h1 className="admin-student-tasks-header">Account Creation</h1>
            <div className="adminIntro-outer-container">
                <div className="adminIntro-inner-container">
                    <div className="adminIntro-option">
                        <Link to="/admin/adminaccountcreation" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={accountCreation} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">Admin Account Creation</p >
                            </div>
                        </Link>
                    </div>
                    <div className="adminIntro-option">
                        <Link to="/admin/studentaccountcreation" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={accountCreation} alt="account-creation" className="student-image"/>
                                <p className="admin-intro-header">Student Account Creation</p >
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AccountCreation