import React, { useState, useEffect } from "react";
import axios from "axios";

const SOPList = (props) => {
  const [sops, setSops] = useState([]);
  const { department_id } = props;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/departments/${department_id}/sops`)

      .then((response) => setSops(response.data))

      .catch((error) => console.error("Error fetching SOPs:", error));
  }, [department_id]);

  return (
    <div>
      <h2>SOP List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SOP ID</th>
            <th>SOP Title</th>
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          {sops.map((sop) => (
            <tr key={sop.sop_id}>
              <td>{sop.sop_id}</td>
              <td>{sop.sop_title}</td>
              <td>{sop.department ? sop.department.department_id : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SOPList;
