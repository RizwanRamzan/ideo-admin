import { Table } from "antd";
// General Style
import { ReactSVG } from "react-svg";
import { Trash } from "../../../assets";
import moment from "moment";

const NewTable = ({ mobileResponsive, data, DeleteEvents }: any) => {
  const columns = [
    {
      key: "8",
      title: "Course name",
      render: (_: any, object: any) => object?.name || "-",
      width: "14.28",
      align: "center",

    },
    {
      key: "8",
      title: "Course batch no",
      render: (_: any, object: any) => object?.batch_no || "-",
      width: "14.28",
      align: "center",

    },

    {
      key: "2",
      title: "Start to End Time",
      render: (_: any, object: any) =>
        `${moment(object?.start_time).format("hh:mm A")} to ${moment(
          object?.end_time
        ).format("hh:mm A")}` || "-",
      width: "14.28",
      align: "center",
    },
    {
      key: "2",
      title: "Start to End Days",
      render: (_: any, object: any) =>
        `${moment(object?.start_days).format("DD-MM-YYYY")} to ${moment(
          object?.end_days
        ).format("DD-MM-YYYY")}` || "-",
      width: "14.28",
      align: "center",
    },
    {
      key: "2",
      title: "Start to End Duration",
      render: (_: any, object: any) =>
        `${moment(object?.start_duration).format("DD-MM-YYYY")} to ${moment(
          object?.end_duration
        ).format("DD-MM-YYYY")}` || "-",
      width: "14.28",
      align: "center",
    },
    {
      key: "2",
      title: "Coure Fee",
      render: (_: any, object: any) => object?.curse_fee || "-",
      width: "14.28",
      align: "center",

    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <ReactSVG
            onClick={() => DeleteEvents(object)}
            style={{ cursor: "pointer" }}
            width={214.28}
            src={Trash}
          />
        </div>
      ),
      width: "14.28",
      align: "center",

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
