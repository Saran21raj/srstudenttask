
import "./Header.css";
import {Link, useNavigate} from "react-router-dom";
import menu from "../../Images/menu.svg";
function Header(){
    const navigate=useNavigate();
    const navbaropen =()=>{
        document.getElementById("navbar").classList.toggle("options-nav");
    }
    const signout=()=>{
        localStorage.clear();
        navigate("/admin/login");
    }
    return(
        <>
        <div className="header">
            <div className="div-icon"><span className="icon">SR</span></div>
            <nav id="navbar">
                <ul>
                    <h1 className="header-student-label">
                        <Link to="/admin/intro" className="header-label"> 
                            Home
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <h1 className="header-student-label">
                        <Link to="/admin/tasks" className="header-label">
                            Student Tasks
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <h1 className="header-student-label">
                        <Link to="/admin/accountcreationintro" className="header-label">
                            Account Creation
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <div className="options">
                        <button className="sign-out-button" onClick={signout}>Log out</button>
                    </div>
                </ul>
            </nav>
            <div className="menu">
                <img  src={menu} className="menu-img" onClick={navbaropen}/>
            </div>
        </div>
        </>
    )
}


export default Header;