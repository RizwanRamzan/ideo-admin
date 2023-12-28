import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import TopBar from "../../Component/Layout/topBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../service/apiCall";
import dayjs from "dayjs";
import moment from "moment";

const RecoveryStudent = () => {
  const studentId = useParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>({});
  const [studentRecovery, setStudentRecovery] = useState<any>([]);
  const [Open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const OpenModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const GetStudentById = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
      setStudentRecovery(res?.data?.studentRecoery?.reverse())
    };

    const onError = (err: any) => {
      setLoading(false);
      message.error(err);
    };

    await getRequest(
      "",
      `slide/get-by-id/${studentId?.id}`,
      true,
      onSuccess,
      onError
    );
  };

  useEffect(() => {
    if (studentId?.id) {
      GetStudentById();
    }
  }, [studentId]);

  const formHandler = async (e: any) => {
    setLoading(true);

    const onSuccess = (res: any) => {
      message.success(res?.message);
      GetStudentById();
      setLoading(false);
      form.resetFields();
      handleOk()
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      roll_number: data?.rollNumber,
      institute: data?.institute,
      student_name: data?.name,
      phone_number: data?.number,
      cnic: data?.cnic,
      email: data?.email,
      address: data?.address,
      dob: dayjs(data?.date),
      courses: data?.course,
      courses_price: data?.coursePrice,
      branch_name: data?.branch,
      paid_fee: data?.paid_free,
      total_fee: data?.paid_total,
      pending_fee: data?.pending_fee,
      recovery: data?.recovery,
      payemnt: data?.payment,
      recived: data?.recived,
      studentRecoery: [
        ...data?.studentRecoery,
        {
          recovery_paid_fee: e?.paid_free,
          recovery_total_fee: e?.paid_total,
          recovery_pending_fee: e?.pending_fee,
          recovery_recovery: e?.recovery,
          recovery_payemnt: e?.payment,
          recovery_recived: e?.recived,
        },
      ],
    };

    if (studentId?.id) {
      await putRequest(
        formData,
        `slide/update-slider/${studentId?.id}`,
        true,
        onSuccess,
        onError
      );
    }
  };

  const columns = [
    {
      key: "8",
      title: "Roll Number",
      render: (_: any, object: any) => data?.roll_number || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Fee Paid",
      render: (_: any, object: any) => object?.recovery_paid_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Total Paid",
      render: (_: any, object: any) => object?.recovery_total_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Pending Fee",
      render: (_: any, object: any) => object?.recovery_pending_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Recovery date",
      render: (_: any, object: any) =>
        moment(object?.recovery_recovery).format("DD-MM-YYYY") || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Payment Method",
      render: (_: any, object: any) => object?.recovery_payemnt || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Recived by",
      render: (_: any, object: any) => object?.recovery_recived || "-",
      width: "12.5",
    },
  ];


  return (
    <Spin spinning={loading}>
      <TopBar title="Add Student Recovery" />
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          span={24}
        >
          <h2>{data?.student_name}</h2>
          <button onClick={() => OpenModal()}>Add Recovery</button>
        </Col>
      </Row>

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
          style={{ width: "100%", marginTop: "20px" }}
        >
          <Row gutter={20}>
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
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              span={24}
            >
              <button style={{padding:"10px 40px"}}>Submit</button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className="MainTable">
        <Table
          className="Table"
          scroll={{ x: 1300, y: 660 }}
          columns={columns}
          dataSource={studentRecovery}
          size="small"
        />
      </div>
    </Spin>
  );
};

export default RecoveryStudent;
