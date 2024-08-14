import React, { useEffect, useState } from 'react';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/employees/all')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="main-page">
      <h2 className="main-page-title">Employees</h2>
      <div className="employee-cards-container">
        {employees.map((employee) => (
          <div key={employee.employeeId} className="employee-card">
            <h3 className="employee-name">{employee.name}</h3>
            <p className="employee-email">Email: {employee.email}</p>
            <p className="employee-phone">Phone: {employee.phoneNumber}</p>
            <p className="employee-department">Department: {employee.department}</p>
            <p className="employee-role">Role: {employee.role}</p>
            {employee.reportsTo && (
              <p className="employee-reports-to">
                Reports to: {employee.reportsTo.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEmployees;