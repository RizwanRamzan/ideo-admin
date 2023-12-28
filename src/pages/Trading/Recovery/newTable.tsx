import { Table } from "antd";
// General Style
import { ReactSVG } from "react-svg";
import { Trash } from "../../../assets";
import moment from "moment";

const NewTable = ({ mobileResponsive, data, DeleteEvents }: any) => {
  const columns = [
    {
      key: "8",
      title: "Roll Number",
      render: (_: any, object: any) =>
        object?.roll_number || "-",
      width: "12.5",

    },
    {
      key: "8",
      title: "Fee Paid",
      render: (_: any, object: any) =>
        object?.paid_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Total Paid",
      render: (_: any, object: any) =>
      object?.total_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Pending Fee",
      render: (_: any, object: any) =>
      object?.pending_fee || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Recovery date",
      render: (_: any, object: any) =>
      moment(object?.recovery).format("DD-MM-YYYY") || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Payment Method",
      render: (_: any, object: any) =>
      object?.payemnt || "-",
      width: "12.5",
    },
    {
      key: "8",
      title: "Recived by",
      render: (_: any, object: any) =>
       object?.recived || "-",
      width: "12.5",
    },
    {
      key: "6",
      title: "Action",
      width: "12.5",
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

          <ReactSVG
            onClick={() => DeleteEvents(object)}
            style={{ cursor: "pointer" }}
            width={20}
            src={Trash}
          />
        </div>
      ),
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

export default NewTable;
