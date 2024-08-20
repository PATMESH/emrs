import React, { useState, useEffect } from 'react';
import AllEmployees from './AllEmployees';
import TaskPage from './TaskPage';
import ProfilePage from './ProfilePage'; 
import companyLogo from './tejas.png';
import lbtn from './logout.png';
import icon from './icon.png';
import { Attendance } from './Attendance';

const Notification = ({ message }) => (
  <div className="notification">
    <p>{message}</p>
  </div>
);

const MainPage = () => {
  const [currentView, setCurrentView] = useState('task');
  const [userName, setUserName] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('role');
    window.location.reload();
  };


  return (
    <div className="main-container">
      {showNotification && <Notification message={`Welcome, ${userName}!`} />}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo" >
            <img src={companyLogo} alt="Company Logo" />
          </div>
          <h1 className="nav-heading">Employee Maintenance & Reporting System</h1>
        </div>
        <ul className="nav-links">
          <li
            className={currentView === 'task' ? 'active' : ''}
            onClick={() => setCurrentView('task')}
          >
            Tasks
          </li>
          <li
            className={currentView === 'Attendance' ? 'active' : ''}
            onClick={() => setCurrentView('Attendance')}
          >
            Attendance
          </li>
          <li
            className={currentView === 'allEmployees' ? 'active' : ''}
            onClick={() => setCurrentView('allEmployees')}
          >
            Employees
          </li>
          <li
            className={currentView === 'profile' ? 'active' : ''}
            onClick={()=>setCurrentView("profile")}
            style={{display:'flex',justifyContent:'center',alignContent:'center'}}
          >
            <img src={icon} alt='icon' width={30} style={{backgroundColor:'whitesmoke', borderRadius:'30px'}}></img>
          </li>
          <li className="logout-btn" onClick={handleLogout}>
            <img src={lbtn} alt="Logout" />
          </li>
        </ul>
      </nav>
      <div className="content">
        {currentView === 'task' && <TaskPage />}
        {currentView === 'allEmployees' && <AllEmployees />}
        {currentView === 'Attendance' && <Attendance />}
        {currentView === 'profile' && <ProfilePage />}
      </div>
    </div>
  );
};

export default MainPage;