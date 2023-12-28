import { Col, DatePicker, Form, Input, Modal, Row, Select, Spin, message } from "antd";
import TopBar from "../../../Component/Layout/topBar";
import { useEffect, useState } from "react";
import { ImgUpload } from "../../../assets";
import { useSelector } from "react-redux";
import NewTable from "./newTable";
import { useMediaQuery } from "react-responsive";
import "./sports.scss"
import { deleteRequest, getRequest, postRequestFormData } from "../../../service/apiCall";



const Sports = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [team1, setTeam1] = useState<any>({
    image: null,
  });



  const GetAllTrading = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data?.reverse());
    };

    const onError = () => {
      setLoading(false);
    };

    await getRequest("", "news/get-all", true, onSuccess, onError);
  };

  useEffect(() => {
    GetAllTrading();
  }, []);

  const EndEvent = (object: any) => {
    setEndModal(object);
  };

  const DeleteEvents = async (object:any) => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      message.success(res?.message)
    };

    const onError = () => {
      setLoading(false);
    };

    await deleteRequest("", `news/delete/${object?._id}`, true, onSuccess, onError);
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
    setTeam1({ image: null });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    form.resetFields();
  };

  const { RangePicker } = DatePicker;

  const formHandler = async (e: any) => {
   
    setLoading(true);

    const onSuccess = (res: any) => {
      console.log(res, "sakjcnsakncjndsckjds");
      message.success(res?.message);
      setLoading(false);
      form.resetFields();
      handleOk()
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      name: e?.rollNumber,
      batch_no: e?.institute,
      start_time: e?.name,
      end_time: e?.number,
      start_days: e?.cnic,
      end_days: e?.email,
      start_duration: e?.address,
      end_duration: e?.date,
      curse_fee: e?.course,

    };

    await postRequestFormData(formData, "news/add", true, onSuccess, onError);
    GetAllTrading()
  
  };




  return (
    <Spin spinning={loading}>
      <TopBar title="Payments" button="Add Course" OpenModal={OpenModal}/>
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All Courses </h2>
        </Col>
      </Row>
      <NewTable
        EndEvent={EndEvent}
        DeleteEvents={DeleteEvents}
        OpenModal={OpenModal}
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

      <Modal
        title="Add Course"
        width="80%"
        footer={false}
        open={Open}
        onOk={handleOk}
        onCancel={handleCancel}
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
                name="course_name"
                label="Course Name"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Course name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="batch"
                label="Course Batch No"
                rules={[{ required: true ,min:0}]}
              >
                <Input
                min={0}
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Course Batch No"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Course Time"
                rules={[{ required: true }]}
              >
                <RangePicker
                  className="ant-input-affix-wrapper"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="days"
                label="Course Days"
                rules={[{ required: true }]}
              >
                <RangePicker
                  className="ant-input-affix-wrapper"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Course Duration"
                rules={[{ required: true }]}
              >
                <RangePicker
                  className="ant-input-affix-wrapper"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fee"
                label="Coure Fee"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Coure Fee"
                />
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
    </Spin>
  );
};

export default Sports;
