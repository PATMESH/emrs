import React, { useState, useEffect } from "react";

const Register = ({ setAuth , setIsRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/employees/all")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  useEffect(() => {
    if (
      name &&
      email &&
      phoneNumber &&
      hireDate &&
      department &&
      role &&
      password &&
      reportsTo
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, email, phoneNumber, hireDate, department, role, password, reportsTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      email,
      phoneNumber,
      hireDate,
      department,
      role,
      password,
      reportsTo: reportsTo !== "" ? { employeeId: reportsTo } : null,
    };

    try {
      const response = await fetch("http://localhost:8080/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        console.log("Employee registered successfully!");
        setIsRegister(false);
      } else {
        console.error("Failed to register employee");
      }
    } catch (error) {
      console.error("Error registering employee:", error);
    }
  };

  return (
    <div className="reg-body">
    <div className="register-container">
      <h3>Register New Employee</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hireDate">Hire Date:</label>
          <input
            type="date"
            id="hireDate"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reportsTo">Reports To:</label>
          <select
            id="reportsTo"
            value={reportsTo}
            onChange={(e) => setReportsTo(e.target.value)}
            required
          >
            <option value="">Select Manager</option>
            {employees.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
   </div>
  );
};

export default Register;
