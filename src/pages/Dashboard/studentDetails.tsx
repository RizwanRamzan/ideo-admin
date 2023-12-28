import { Col, DatePicker, Form, Input, Row, Spin, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import "./studentDetail.scss";
import { useParams } from "react-router-dom";
import { getRequest } from "../../service/apiCall";
import { IsttaaInstitute } from "../../assets";
import moment from "moment";
import dayjs from "dayjs";

const StudentDetails = () => {
  const studentId = useParams();
  const [loading, setLoading] = useState(false);
  const [studentRecovery, setStudentRecovery] = useState<any>([]);

  const [form] = Form.useForm();

  const [data, setData] = useState<any>({});

  const GetStudentById = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
      setStudentRecovery(res?.data?.studentRecoery?.reverse());
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

  useEffect(() => {
    if (studentId?.id) {
      form.setFieldsValue({
        rollNumber: data?.roll_number,
        institute: data?.institute,
        name: data?.student_name,
        number: data?.phone_number,
        cnic: data?.cnic,
        email: data?.email,
        address: data?.address,
        date: dayjs(data?.dob),
        course: data?.courses,
        coursePrice: data?.courses_price,
        branch: data?.branch_name,
        paid_free: data?.paid_fee,
        paid_total: data?.total_fee,
        pending_fee: data?.pending_fee,
        recovery: dayjs(data?.recovery),
        payment: data?.payemnt,
        recived: data?.recived,
      });
    }
  }, [data]);

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <Row gutter={10} className="studentDetails">
          <Col span={24}>
            <div className="header">
              <img src={IsttaaInstitute} width="20%" />
              <h4>{moment(new Date()).format("MM-DD-YYYY hh:mm A")}</h4>
            </div>
          </Col>
          <Col span={24}>
            <h2>Personal Information</h2>
          </Col>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Student Name"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter slide name"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="date"
              label="Student DOB"
            >
              <DatePicker disabled className="ant-input-affix-wrapper" picker="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="number"
              label="Student Phone Number"
            >
              <Input
              readOnly
                min={0}
                type="number"
                className="ant-input-affix-wrapper"
                placeholder="Enter slide name"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="cnic"
              label="CNIC ( unique ) 13 digits"
            >
              <Input
              readOnly
                type="number"
                min={0}
                className="ant-input-affix-wrapper"
                placeholder="Enter slide name"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Student Email Address"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter slide name"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="address"
              label="Student Address"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter student address"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <h2>Course Details</h2>
          </Col>

          <Col span={8}>
            <Form.Item
              name="course"
              label="Courses"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter student course"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="courseDate"
              label="Batch Date / Time"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter student course"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="course no"
              label="Batch No"
            >
              <Input
              readOnly
                className="ant-input-affix-wrapper"
                placeholder="Enter student course"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <h2>Student Recovery</h2>
          </Col>

          <div className="MainTable">
            <Table
              className="Table"
              scroll={{ x: 1300, y: 660 }}
              columns={columns}
              dataSource={studentRecovery}
              size="small"
              pagination={false}
            />
          </div>

          <Col span={24} style={{ marginTop: "20px" }}>
            <p style={{ textAlign: "center" }}>
              Fee is not refundable but the student have option to freeze or
              transfer in any course as per policy. For more information
              regarding policy Please visit: institute.isttaa.com/policy{" "}
            </p>
          </Col>
          <Col span={24} style={{ marginTop: "20px" }}>
            <div className="header" style={{ border: "none" }}>
              <p style={{ fontSize: "18px" }}>
                Student _______________________________
              </p>
              <p style={{ fontSize: "18px" }}>
                Received ______________________________
              </p>
            </div>
          </Col>

          <Col span={24} style={{ marginTop: "20px" }}>
            <div className="footer">
              <p>
                <b>Web:</b> institute.isttaa.com | <b>Contact:</b> 0300 1104782
              </p>
              <p>
                <b>Head Office:</b> Office 01, Level 03, Arfa
                Software Technology Park
              </p>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default StudentDetails;
