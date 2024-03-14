import React, { useState, useEffect } from "react";
import axios from "axios";
import SOPList from "./SOPList";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showEmployees, setshowEmployees] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [sops, setSops] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleDepartmentClick = async (department_id) => {
    setshowEmployees(false);
    setSelectedDepartment(department_id);
  };
  return (
    <div>
      {showEmployees && (
        <>
          <h2>EmployeeList</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th onClick={() => handleDepartmentClick("department_id")}>
                  Department ID
                </th>
                <th>Training_Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.employee_name}</td>
                  <td>{employee.start_date}</td>
                  <td>{employee.end_date}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDepartmentClick(employee.department.department_id)
                      }
                    >
                      {employee.department.department_id}
                    </button>
                  </td>
                  <td>{employee.completed ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!showEmployees && <SOPList department_id={selectedDepartment} />}
    </div>
  );
};

export default EmployeeList;