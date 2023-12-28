import { Table } from "antd";
// General Style
import { ReactSVG } from "react-svg";
import { Trash } from "../../../assets";
import moment from "moment";

const NewTable = ({ mobileResponsive, data,DeleteEvents}: any) => {

  const columns = [
    
  
    {
      key: "8",
      title: "Course name",
      render: (_: any, object: any) => <img width="40px" height="40px" src="/tabLogo.png" /> || "-",
      width: "14.28",
    },
    {
      key: "8",
      title: "course batch no",
      render: (_: any, object: any) => moment(object?.date).format("YYYY-MM-DD") || "-",
      width: "14.28",
    },
  
    {
      key: "2",
      title: "Course Start to End Time",
      render: (_: any, object: any) => object?.description || "-",
      width: "14.28",
    },
    {
      key: "2",
      title: "Course Days",
      render: (_: any, object: any) => object?.description || "-",
      width: "14.28",
    },
    {
      key: "2",
      title: "Course Duration",
      render: (_: any, object: any) => object?.description || "-",
      width: "14.28",
    },
    {
      key: "2",
      title: "Coure Fee",
      render: (_: any, object: any) => object?.description || "-",
      width: "14.28",
    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>

          <ReactSVG onClick={() => DeleteEvents(object)} style={{ cursor: "pointer" }} width={214.280} src={Trash} />
        </div>
      ),
      width: "14.28",
    },
  ];

  return (
    <div className="MainTable">
      <Table
        className="Table"
        scroll={{x: 1300, y: 660 }}
        onChange={(e) => console.log(e)}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};


export default NewTable;
