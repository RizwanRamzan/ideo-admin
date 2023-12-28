import { Navigate, Route, Routes } from "react-router-dom";
import Sports from "../../pages/Trading/News";
import Dashboard from "../../pages/Dashboard";
import Blogs from "../../pages/Trading/Blogs";
import Branch from "../../pages/Trading/Branch";
import Recovery from "../../pages/Trading/Recovery";
import Courses from "../../pages/Trading/News";
import FormHandle from "../../pages/Dashboard/formHandle";
import RecoveryStudent from "../../pages/Dashboard/recoveryStudent";
import StudentDetails from "../../pages/Dashboard/studentDetails";


const HomeRoutes = () => {

    

    return (
        <Routes>
          
            <Route path={"*" } element={<Navigate to="/admin/dashboard" replace />} />
            {/* Dashboard */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/student-update/:id" element={<FormHandle />} />
            <Route path="/admin/add-student-recovery/:id" element={<RecoveryStudent />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/branch" element={<Branch />} />
            <Route path="/admin/recovery" element={<Recovery />} />
            <Route path="/admin/student-details/:id" element={<StudentDetails />} />
          

        </Routes>

    )
}

export default HomeRoutes