// import ApplcationRoutes from './Config/ApplicationRoutes'
import HomeRoutes from "./Routes/HomeRoutes";
import Layout from "./Component/Layout/Layout";
import { useSelector } from "react-redux";
import AuthRoutes from "./Routes/AuthRoutes";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate()
  const token = useSelector((state: any) => state.authReducer.adminTokenIdeo);

  if (!token) {
    localStorage.setItem("adminTokenIdeo", "");
    navigate("/admin/login")
  }

  return (
    <>
      {token ? (
        <Layout>
          <HomeRoutes />
        </Layout>
      ) : (
        <AuthRoutes />
      )}
    </>
  );
}

export default App;
