import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  TimePicker,
  message,
} from "antd";
import TopBar from "../../../Component/Layout/topBar";
import { useEffect, useState } from "react";
import { ImgUpload } from "../../../assets";
import { useSelector } from "react-redux";
import NewTable from "./newTable";
import { useMediaQuery } from "react-responsive";
import "./sports.scss";
import {
  deleteRequest,
  getRequest,
  postRequestFormData,
} from "../../../service/apiCall";

const Courses = () => {
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
  const [img, setImg] = useState<File | null>(null);
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

  const DeleteEvents = async (object: any) => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      message.success(res?.message);
    };

    const onError = () => {
      setLoading(false);
    };

    await deleteRequest(
      "",
      `news/delete/${object?._id}`,
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
    setTeam1({ image: null });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    form.resetFields();
  };

  const { RangePicker } = DatePicker;

  const formHandler = async (e: any) => {
    if (team1?.image) {
      setLoading(true);

      const onSuccess = (res: any) => {
        message.success(res?.message);
        setLoading(false);
        form.resetFields();
        handleOk();
      };
      const onError = (err: any) => {
        message.error(err?.message);
        setLoading(false);
      };

      const formData = {
        name: e?.course_name,
        batch_no: e?.batch,
        type: e?.type,
        start_time: e?.time[0],
        end_time: e?.time[1],
        start_days: e?.days[0],
        end_days: e?.days[0],
        start_duration: e?.duration[0],
        end_duration: e?.duration[0],
        curse_fee: e?.fee,
        description: e?.dec,
        level: e?.level,
        image: img,
      };

      await postRequestFormData(formData, "news/add", true, onSuccess, onError);
      GetAllTrading();
    } else {
      message.warning("please upload image");
    }
  };

  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
    };
  };

  return (
    <Spin spinning={loading}>
      <TopBar title="Courses" button="Add Course" OpenModal={OpenModal} />
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
          <Row gutter={[20,20]}>
            <Col span={24}>
              <div className="form-left">
                {team1.image ? (
                  <>
                    <label
                      className="image-upload-button"
                      htmlFor="image-upload1"
                      onClick={handleTeam1}
                    >
                      <img style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} src={team1.image} alt="uploaded" />
                    </label>
                  </>
                ) : (
                  <>
                    <label
                      className="image-upload-button"
                      htmlFor="image-upload1"
                    >
                      <img src={ImgUpload} />

                    </label>
                  </>
                )}
                <input
                  style={{ display: "none" }}
                  id="image-upload1"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleTeam1}
                />
              </div>
            </Col>
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
              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Select
                  className="ant-select-selector"
                  placeholder="Enter select type"
                >
                  <Select.Option value="design">Design</Select.Option>
                  <Select.Option value="development">Development</Select.Option>
                  <Select.Option value="marketing">Marketing</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="batch"
                label="Course Batch No"
                rules={[{ required: true, min: 0 }]}
              >
                <Input
                  min={0}
                  type="number"
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
                <TimePicker.RangePicker
                  format="hh:mm"
                  className="ant-input-affix-wrapper"
                  use12Hours={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="days"
                label="Course Days"
                rules={[{ required: true }]}
              >
                <RangePicker className="ant-input-affix-wrapper" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Course Duration"
                rules={[{ required: true }]}
              >
                <RangePicker className="ant-input-affix-wrapper" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fee"
                label="Course Fee"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Coure Fee"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="level"
                label="Level"
                rules={[{ required: true }]}
              >
                <Select
                  className="ant-select-selector"
                  placeholder="Enter select level"
                >
                  <Select.Option value="basic">Basic</Select.Option>
                  <Select.Option value="intermediate">
                    Intermediate
                  </Select.Option>
                  <Select.Option value="advance">Advance</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="dec"
                label="Course Description"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Coure Description"
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

export default Courses;
