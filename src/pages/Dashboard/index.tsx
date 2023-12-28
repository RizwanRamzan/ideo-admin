import { useMediaQuery } from "react-responsive";
import TopBar from "../../Component/Layout/topBar";
import DashboardTable from "./dasboardTable";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import {
  deleteRequest,
  getRequest,
  postRequestFormData,
} from "../../service/apiCall";

type contectData = {
  image: any;
  file: any;
};

const Dashboard = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state: any) => state.authReducer.Admintoken);

  const [formState, setFormState] = useState<contectData>({
    image: null,
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [team1, setTeam1] = useState<any>({
    image: null,
  });

  // post create

  const GetAllCourses = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setAllCourses(res?.data?.reverse());
    };

    const onError = () => {
      setLoading(false);
    };

    await getRequest("", "news/get-all", true, onSuccess, onError);
  };

  useEffect(() => {
    GetAllCourses();
  }, []);

  const GetAllTrading = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
      setAllData(res?.data);
    };

    const onError = (err: any) => {
      setLoading(false);
      message.error(err);
    };

    await getRequest("", "slide/get-all", true, onSuccess, onError);
  };

  useEffect(() => {
    GetAllTrading();
  }, []);

  const EndEvent = (object: any) => {
    setEndModal(object);
  };

  const DeleteEvents = async (object: any) => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      message.success(res?.message);
    };

    const onError = (err: any) => {
      setLoading(false);
      message.error(err);
    };

    await deleteRequest(
      "",
      `slide/delete/${object?._id}`,
      true,
      onSuccess,
      onError
    );
    GetAllTrading();
  };

  const [form] = Form.useForm();

  const OpenModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    form.resetFields();
  };

  const formHandler = async (e: any) => {
    setLoading(true);

    const onSuccess = (res: any) => {
      console.log(res, "sakjcnsakncjndsckjds");
      message.success(res?.message);
      setLoading(false);
      handleOk();
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      roll_number: e?.rollNumber,
      institute: e?.institute,
      student_name: e?.name,
      phone_number: e?.number,
      cnic: e?.cnic,
      email: e?.email,
      address: e?.address,
      dob: e?.date,
      courses: e?.course,
      courses_price: e?.coursePrice,
      branch_name: e?.branch,
      paid_fee: e?.paid_free,
      total_fee: e?.paid_total,
      pending_fee: e?.pending_fee,
      recovery: e?.recovery,
      payemnt: e?.payment,
      recived: e?.recived,
    };

    await postRequestFormData(formData, "slide/add", true, onSuccess, onError);
    GetAllTrading();
  };

  const studentSearch = (e: any) => {
    console.log("lkdsclkdsclksdmc");
    const filterData = allData?.filter((item: any) =>
      item?.student_name?.toLowerCase().trim().includes(e?.toLowerCase().trim())
    );
    setData(filterData);
  };

  return (
    <>
      <TopBar title="Students" button="Add Student" OpenModal={OpenModal} />
      <Row style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <h2 className="all-trading"> All Students </h2>
        </Col>
        <Col span={mobileResponsive ? 12 : 6}>
          <Input
            onChange={(e) => studentSearch(e.target.value)}
            className="ant-input-affix-wrapper"
            placeholder="Student search"
          />
        </Col>
      </Row>
      <DashboardTable
        EndEvent={EndEvent}
        DeleteEvents={DeleteEvents}
        OpenModal={OpenModal}
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

      <Modal
        title="Add Student"
        footer={false}
        open={Open}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
      >
        <Form
          form={form}
          onFinish={formHandler}
          layout="vertical"
          style={{ width: "100%" }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="rollNumber"
                label="Roll number"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  min={50000}
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="institute"
                label="Institute"
                rules={[{ required: true }]}
              >
                <Select
                  className="ant-select-selector"
                  placeholder="Enter slide name"
                >
                  <Select.Option value="ideo">Ideo Institute</Select.Option>
                  <Select.Option value="isttaa">Isttaa Institute</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Student Name"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="number"
                label="Student Phone Number"
                rules={[{ required: true }]}
              >
                <Input
                  min={0}
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="cnic"
                label="CNIC ( unique ) 13 digits"
                rules={[{ required: true, max: 13 }]}
              >
                <Input
                  type="number"
                  min={0}
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Student Email Address"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Student Address"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter student address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Student DOB"
                rules={[{ required: true }]}
              >
                <DatePicker className="ant-input-affix-wrapper" picker="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="course"
                label="Courses"
                rules={[{ required: true }]}
              >
                <Select
                  className="ant-select-selector"
                  placeholder="Enter slide name"
                >
                  {allCourses?.map((item: any, index: any) => (
                    <Select.Option key={index} value={item?.name}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="coursePrice"
                label="Courses Price"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter student course price"
                />
              </Form.Item>
            </Col>
            {/* {Paid} */}
            <Col span={12}>
              <Form.Item
                name="paid_free"
                label="Fee Paid"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Fee Paid"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paid_total"
                label="Total Paid"
                rules={[{ required: true, min: 0 }]}
              >
                <Input
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Total Paid"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pending_fee"
                label="Pending Fee"
                rules={[{ required: true, min: 0 }]}
              >
                <Input
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Pending"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="recovery"
                label="Recovery date"
                rules={[{ required: true }]}
              >
                <DatePicker className="ant-input-affix-wrapper" picker="date" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="payment"
                label="Payment Method"
                rules={[{ required: true }]}
              >
                <Select
                  className="ant-select-selector"
                  placeholder="Enter select branch name"
                >
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="jassCash">Jass Cash</Select.Option>
                  <Select.Option value="easyPaisa">Easy Paisa</Select.Option>
                  <Select.Option value="bank">Bank</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="recived"
                label="Recived by"
                rules={[{ required: true, min: 0 }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Recived by"
                />
              </Form.Item>
            </Col>

            {/*  */}
            <Col span={24}>
              <Form.Item
                name="branch"
                label="Branch Name"
                rules={[{ required: true }]}
              >
                <Select
                  className="ant-select-selector"
                  placeholder="Enter select branch name"
                >
                  <Select.Option value="ideo">Ideo Institute</Select.Option>
                  <Select.Option value="isttaa">Isttaa Institute</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              span={24}
            >
              <button style={{ width: "100px" }}>Submit</button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
