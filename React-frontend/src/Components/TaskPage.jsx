import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPage = () => {
  const [task, setTask] = useState({
    taskName: '',
    description: '',
    startDate: '',
    dueDate: '',
    status: '',
    assignedTo: null,
    assignedBy: null
  });
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({ completed: 0, pending: 0 });
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState(null);
  const [taskpage , setTaskPage] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    const storedRole = localStorage.getItem('role');
  
    if (employeeId && storedRole) {
      setRole(storedRole);
      fetchTasks(employeeId);
       if (storedRole === 'Manager') {
        fetchEmployees(employeeId);  
        fetchManagerDetails(employeeId);
      }
    }
  }, []);

  useEffect(() => {
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const pending = tasks.length - completed;
    setTaskStats({ completed, pending });
  }, [tasks]);

  const chartData = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        data: [taskStats.completed, taskStats.pending],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  const fetchManagerDetails = async (managerId) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${managerId}`);
      const managerData = await response.json();
      setTask(prevTask => ({...prevTask, assignedBy: managerData}));
    } catch (error) {
      console.error('Error fetching manager details:', error);
    }
  };

  const fetchTasks = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/employee/${employeeId}`);
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks');
    }
  };

  const fetchEmployees = async (managerId) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/org/${managerId}`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/tasks/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          assignedTo: selectedEmployee,
        }),
      });
      await response.json();
      alert('Task assigned successfully');
      setTask({
        taskName: '',
        description: '',
        startDate: '',
        dueDate: '',
        status: '',
        assignedTo: null,
        assignedBy: null
      });
      setShowAssignForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to assign task');
    }
  };


  const handleStatusUpdate = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });

      if (response.ok) {
        alert('Task marked as completed');
        const employeeId = localStorage.getItem('employeeId');
        fetchTasks(employeeId);
      } else {
        alert('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const renderManagerView = () => (
    <div className="manager-view"><button className="nav-button" onClick={()=>{setTaskPage(true)}}>your task {">"}</button>
      <h2 className="main-page-title">Your Team</h2>
      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.employeeId} className="employee-item">
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Department: {employee.department}</p>
            <p className="employee-role">{employee.role}</p>
            <button onClick={() => {
              setSelectedEmployee(employee);
              setShowAssignForm(true);
            }} className="assign-task-btn">Assign Task</button>
          </li>
        ))}
      </ul>
    </div>
  );


  const renderAssignTaskForm = () => (
    <div className="assign-task-popup">
      <div className="assign-task-content">
        <h2 style={{fontSize:'30px'}}>Assign Task to {selectedEmployee.name}</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name</label>
            <input type="text" name="taskName" value={task.taskName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={task.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" name="startDate" value={task.startDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
          </div>
          <input type="hidden" name="status" value="Assigned" />
          <div className="form-actions">
            <button type="submit" className="submit-btn">Assign Task</button>
            <button type="button" onClick={() => setShowAssignForm(false)} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderEmployeeView = () => (
    <div className="employee-view"><button className="nav-button" onClick={()=>{setTaskPage(false)}}>{"<"} Go back</button>
      <h2 className="main-page-title">Your Perfomance</h2>
      <div className="performance-chart">
      <h3>Task Performance</h3>
      <div style={{ height: '300px', width: '300px', margin: 'auto' }}>
        <Pie data={chartData} options={options} />
      </div>
      <div className="performance-stats">
        <p>Total Completed Tasks: {taskStats.completed}</p>
        <p>Total Pending Tasks: {taskStats.pending}</p>
      </div>
    </div>
    </div>
  );

  const renderEmployeeTaskView = () => (
    <div className="employee-view"><button className="nav-button" onClick={()=>{setTaskPage(true)}}>your Perfomance {">"}</button>
      <h2 className="main-page-title">Your Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.taskId} className="task-item">
            <h3 style={{width:'25%'}} className='good'>{task.taskName}</h3>
            <p className="task-description" style={{width:'25%'}}>{task.description}</p>
            {task.status === 'Completed' ? (
              <div style={{width:'25%',textAlign:'center'}}><p className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`} style={{width:'35%'}}>{task.status}</p></div>
            ):<div style={{width:'25%',textAlign:'center'}}><button onClick={() => handleStatusUpdate(task.taskId)} className="complete-task-btn" style={{width:'85%'}}>Mark as Completed</button></div>}
            <p className="task-due-date" style={{width:'25%',textAlign:'center'}}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderManagerTaskView = () => (
    <div className="employee-view"><button className="nav-button" onClick={()=>setTaskPage(false)}>{"<"} Go back</button>
      <h2 className="main-page-title">Your Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.taskId} className="task-item">
            <h3>{task.taskName}</h3>
            <p className="task-description">{task.description}</p>
            <p className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</p>
            <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            {task.status !== 'Completed' && (
              <button onClick={() => handleStatusUpdate(task.taskId)} className="complete-task-btn">Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="task-container">
      {role === 'Manager' ? taskpage?renderManagerTaskView():renderManagerView() : !taskpage?renderEmployeeTaskView():renderEmployeeView()}
      {showAssignForm && renderAssignTaskForm()}
    </div>
  );
};

export default TaskPage;