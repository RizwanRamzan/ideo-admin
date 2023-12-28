import { useState } from "react";
import { Col, Form, Input, Row, Spin, message } from "antd";
import { IsttaaInstitute, Logo } from "../../assets";
import "./auth.scss";
import "../../GeneralStyle/index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken, setUserCompleteDetails } from "../../Redux/Reducers/authSlice";
import { postRequest } from "../../service/apiCall";

const Login = () => {
  const [userBody, setUserBody] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const formHandler = async (e: any) => {
    setLoading(true)

    const onSuccess = (res: any) => {
        message.success(res?.message)
        dispatch(setUser(res.user));
        dispatch(setToken(res?.token))
        dispatch(setUserCompleteDetails(res.data))
        localStorage.setItem("adminTokenIdeo", res?.token)
        navigate("/admin/dashboard")
        setLoading(false)
    }
    const onError = (err: any) => {
        message.error(err?.message)
        setLoading(false)
    }

    
    const formData = {
      email: e?.email,
      password: e?.password,
    };

    await postRequest(formData, "user/login", true, onSuccess, onError)
}


  // const onChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setUserBody({ ...userBody, [name]: value });
  // };

  return (
    <Spin spinning={loading}>
      <div className="auth">
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <img width={200} src={IsttaaInstitute} />
          </Col>
        </Row>
        <div className="auth-box">
          <div className="auth-fields">
            <Form onFinish={formHandler} layout="vertical">
              <Row>
                <Col>
                  <h2>Admin Login</h2>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "please enter valid email",
                      },
                    ]}
                  >
                    <Input
                      className="ant-input-affix-wrapper"
                      placeholder="Please enter your email"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "please enter password" },
                    ]}
                  >
                    <Input.Password
                      className="ant-input-affix-wrapper"
                      placeholder="Please enter your password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <button style={{ width: "100%" }}>Login</button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
