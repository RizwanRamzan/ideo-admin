import { useState } from "react";
import { ReactSVG } from "react-svg";
import "../../Styles/Layout/SideBar.scss";
import { DashboardIcon, IsttaaInstitute} from "../../assets";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {

    const [selectedOption, setSelectedOption] = useState("")

    const location = window.location.pathname

    const toggle = (tabName: any) => {
        setSelectedOption(tabName)
    }

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        window.location.href = "/admin/login"
    }



    return (
        <div className="side-bar-main">
            <div className="side-bar-content">
                <div className="side-bar">
                    <div className="side-bar-top-section">
                        <img style={{ cursor: "pointer", width: "50px" }} onClick={() => navigate("/admin")} src={IsttaaInstitute} />
                        <div className="side-bar-top-section-items">
                            <Link to={"/admin/dashboard"} onClick={() => toggle("/admin/dashboard")}>
                                <div className={location.includes("/admin/dashboard") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Students</p>
                                </div>
                            </Link>
                            <Link to={"/admin/courses"} onClick={() => toggle("/admin/courses")}>
                                <div className={location.includes("/admin/courses") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Courses</p>
                                </div>
                            </Link>
                            {/* <Link to={"/admin/blogs"} onClick={() => toggle("/admin/blogs")}>
                                <div className={location.includes("/admin/blogs") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Payments</p>
                                </div>
                            </Link> */}
                            {/* <Link to={"/admin/branch"} onClick={() => toggle("/admin/branch")}>
                                <div className={location.includes("/admin/branch") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Branch</p>
                                </div>
                            </Link> */}
                            {/* <Link to={"/admin/recovery"} onClick={() => toggle("/admin/recovery")}>
                                <div className={location.includes("/admin/recovery") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Recovery</p>
                                </div>
                            </Link>
                             */}
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }} className="side-bar-down-section">

                        <div className="side-bar-profile">
                            <p onClick={() => logout()} style={{ color: "red", fontWeight: "600", cursor: "pointer" }}>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
