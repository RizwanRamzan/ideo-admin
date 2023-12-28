import { Table } from "antd";
import moment from "moment";
// General Style
import "../../GeneralStyle/index.scss";
import {
  DetaislIcon,
  Edit,
  LogoutIcon,
  RecoveryPayment,
  Trash,
} from "../../assets";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

const DashboardTable = ({
  mobileResponsive,
  data,
  EndEvent,
  DeleteEvents,
  OpenModal,
  setUser,
}: any) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "8",
      title: "Roll Number",
      render: (_: any, object: any) => object?.roll_number || "-",
      width: "11.11",
    },

    {
      key: "8",
      title: "Institute",
      render: (_: any, object: any) => object?.institute || "-",
      width: "11.11",
    },

    {
      key: "2",
      title: "Student Name",
      render: (_: any, object: any) => object?.student_name || "-",
      width: "11.11",
    },
    {
      key: "2",
      title: "Phone Number",
      render: (_: any, object: any) => object?.phone_number || "-",
      width: "11.11",
    },
    {
      key: "2",
      title: "Email Address",
      render: (_: any, object: any) => object?.email || "-",
      width: "11.11",
    },
    {
      key: "2",
      title: "Course",
      render: (_: any, object: any) => object?.courses || "-",
      width: "11.11",
    },
    {
      key: "2",
      title: "Course Price",
      render: (_: any, object: any) => object?.courses_price || "-",
      width: "11.11",
    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          {/* <ReactSVG
            onClick={() =>{
                 EndEvent(object)
                 setUser(object)
                 OpenModal()
                }}
            width={20}
            src={LogoutIcon}
            className="end-point"
          /> */}

          <img
            onClick={() =>
              navigate(`/admin/add-student-recovery/${object?._id}`)
            }
            style={{ cursor: "pointer" }}
            width={20}
            src={RecoveryPayment}
          />
          <ReactSVG
            onClick={() => navigate(`/admin/student-update/${object?._id}`)}
            style={{ cursor: "pointer" }}
            width={20}
            src={Edit}
          />
          <ReactSVG
            onClick={() => DeleteEvents(object)}
            style={{ cursor: "pointer" }}
            width={20}
            src={Trash}
          />
          <img
           onClick={() =>
            navigate(`/admin/student-details/${object?._id}`)
          }
            style={{ cursor: "pointer" }}
            width={20}
            src={DetaislIcon}
          />
        </div>
      ),
      width: "11.11",
    },
  ];

  return (
    <div className="MainTable">
      <Table
        className="Table"
        scroll={{ x: 1300, y: 660 }}
        onChange={(e) => console.log(e)}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

export default DashboardTable;
