import { Drawer } from "antd";
import "../../Styles/Layout/TopBar.scss";
import { ReactSVG } from "react-svg";
import { BackArrow, DashboardIcon, Logo, MenuIcon, TryAngleIcon } from "../../assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Utils/Helpers/BreadCrumb";


const TopBar = ({ title,breadcrumb,consdition ,button,OpenModal}: any) => {

    const navigate = useNavigate();


    const backHandler = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")

    const location = window.location.pathname

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };



    const toggle = (tabName: any) => {
        // if (tabName == selectedOption) {
        //     setSelectedOption("")
        //     return
        // }
        setSelectedOption(tabName)
    }

    return (
        <>
            <div className="mobile-header" >
                <img width={150} src={Logo} />
                <img width={"20px"} onClick={showDrawer} src={MenuIcon} />
            </div>
            <div className="dashboard-header-main">
                <div className="dashboard-heading">
                    {
                        breadcrumb  && consdition &&
                        <div style={{ paddingBottom: "20px" }} className="main-top">
                            <ReactSVG
                                src={BackArrow}
                                className="back-button"
                                onClick={backHandler}
                                
                            />
                            <div className="page-name-wrapper">
                                <p>{title}</p>
                                <Breadcrumb />
                            </div>
                        </div>
                    }
                    
                    {title && !consdition && !button &&<p>{title}</p>}


{
                        button && title &&
                        <div style={{ paddingBottom: "20px",display:"flex",justifyContent:"space-between",alignItems:"center" }} className="main-top">
                            <p>{title}</p>
                            <button onClick={()=>OpenModal()} style={{marginTop:0,width:"150px"}}>{button}</button>
                        </div>
                    }
                   
                </div>
            </div>
            <Drawer
                title="Menu"
                placement={"right"}
                closable={true}
                onClose={onClose}
                open={open}
                width={"250px"}
                key={"right"}
                className="mobile-menu-drawer"
            >
                <div className="side-bar-top-section-items">
                <Link to={"/admin/dashboard"} onClick={() => toggle("/admin/dashboard")}>
                                <div className={location.includes("/admin/dashboard") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Home</p>
                                </div>
                            </Link>
                            <Link to={"/admin/news"} onClick={() => toggle("/admin/news")}>
                                <div className={location.includes("/admin/news") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>News</p>
                                </div>
                            </Link>
                            <Link to={"/admin/blogs"} onClick={() => toggle("/admin/blogs")}>
                                <div className={location.includes("/admin/blogs") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Blogs</p>
                                </div>
                            </Link>
                            <Link to={"/admin/video"} onClick={() => toggle("/admin/video")}>
                                <div className={location.includes("/admin/video") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Video</p>
                                </div>
                            </Link>
                </div>
            </Drawer>
        </>
    );
};

export default TopBar;
