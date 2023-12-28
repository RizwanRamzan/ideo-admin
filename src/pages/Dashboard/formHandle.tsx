import { Col, DatePicker, Form, Input, Row, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRequest,
  postRequestFormData,
  putRequest,
  putRequestFormData,
} from "../../service/apiCall";
import TopBar from "../../Component/Layout/topBar";
import dayjs from "dayjs";
import moment from "moment";

const FormHandle = () => {
  const studentId = useParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>({});

  const [form] = Form.useForm();

  const GetStudentById = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
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

  const formHandler = async (e: any) => {
    setLoading(true);

    const onSuccess = (res: any) => {
      message.success(res?.message);
      setLoading(false);
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
      dob: dayjs(e?.date),
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

    if(studentId?.id){
      await putRequest(formData, `slide/update-slider/${studentId?.id}`, true, onSuccess, onError);

    }else{

      await postRequestFormData(formData, "slide/add", true, onSuccess, onError);
    }

  };







  return (
    <Spin spinning={loading}>
      <TopBar  title="Update Student" />

      <Form
        form={form}
        onFinish={formHandler}
        layout="vertical"
        style={{ width: "100%", marginTop: "20px" }}
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
                <Select.Option value="ideo">Ideo Institute</Select.Option>
                <Select.Option value="isttaa">Isttaa Institute</Select.Option>
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
              style={{ display: "flex", justifyContent: "center",paddingBottom:"20px" }}
              span={24}
            >
              <button style={{ width: "100px" }}>Update</button>
            </Col>
        </Row>
      </Form>


    </Spin>
  );
};

export default FormHandle;
