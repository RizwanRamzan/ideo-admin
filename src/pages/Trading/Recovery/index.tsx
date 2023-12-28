import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
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

const Recovery = () => {
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

    await getRequest("", "blog/get-all", true, onSuccess, onError);
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
      `blog/delete/${object?._id}`,
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
    setTeam1({ image: null });
  };

  const formHandler = async (e: any) => {
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
      roll_number: e?.rollNumber,
      paid_fee: e?.paid_free,
      total_fee: e?.paid_total,
      pending_fee: e?.pending_fee,
      recovery: e?.recovery,
      payemnt: e?.payment,
      recived: e?.recived,
    };

    await postRequestFormData(formData, "blog/add", true, onSuccess, onError);
    GetAllTrading();
  };

  return (
    <Spin spinning={loading}>
      <TopBar title="Recovery" button="Add Recovery" OpenModal={OpenModal} />
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All Recovery </h2>
        </Col>
        <Col span={mobileResponsive ? 12 : 6}>
          <Input
            className="ant-input-affix-wrapper"
            placeholder="Recovery search"
          />
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
        title="Add Recovery"
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
                name="rollNumber"
                label="Roll Number"
                rules={[{ required: true }]}
              >
                <Input
                  min={50000}
                  type="number"
                  className="ant-input-affix-wrapper"
                  placeholder="Enter Fee Paid"
                />
              </Form.Item>
            </Col>
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

            <Col span={24}>
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

export default Recovery;
