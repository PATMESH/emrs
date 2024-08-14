import React, { useState, useEffect } from 'react';
import AllEmployees from './AllEmployees';
import TaskPage from './TaskPage';
import ProfilePage from './ProfilePage'; 
import companyLogo from './tejas.png';
import lbtn from './logout.png';

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

  const handleLogoClick = () => {
    if(currentView==='profile'){
      setCurrentView("task");
    }else{
      setCurrentView("profile")
    }
  };

  return (
    <div className="main-container">
      {showNotification && <Notification message={`Welcome, ${userName}!`} />}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo" onClick={handleLogoClick}>
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
            className={currentView === 'allEmployees' ? 'active' : ''}
            onClick={() => setCurrentView('allEmployees')}
          >
            Employees
          </li>
          <li className="logout-btn" onClick={handleLogout}>
            <img src={lbtn} alt="Logout" />
          </li>
        </ul>
      </nav>
      <div className="content">
        {currentView === 'task' && <TaskPage />}
        {currentView === 'allEmployees' && <AllEmployees />}
        {currentView === 'profile' && <ProfilePage />}
      </div>
    </div>
  );
};

export default MainPage;