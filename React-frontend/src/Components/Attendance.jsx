import React, { useEffect, useState } from 'react';

export const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceMap, setAttendanceMap] = useState(new Map()); 
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/api/attendance/${employeeId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const now = new Date();
        const past15Days = new Date();
        past15Days.setDate(now.getDate() - 15);

        const filteredData = data.filter(attendance => new Date(attendance.date) >= past15Days);

        const attendanceMap = new Map();
        filteredData.forEach(attendance => {
          const dateKey = new Date(attendance.date).toLocaleDateString();
          attendanceMap.set(dateKey, attendance);
        });
        setAttendanceMap(attendanceMap);
        setAttendanceData(filteredData);
      } catch (error) {
        setError('There was a problem with the fetch operation');
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) {
    return <p className="attendance-loading">Loading...</p>;
  }

  if (error) {
    return <p className="attendance-error">{error}</p>;
  }

  const now = new Date();
  const past15Days = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(now.getDate() - i);
    return date.toLocaleDateString();
  })

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Your Attendance</h1>
      {past15Days.length === 0 ? (
        <p className="attendance-empty">No attendance records found.</p>
      ) : (
        <ul className="attendance-list">
          {past15Days.map((date) => {
            const attendance = attendanceMap.get(date);
            const isToday = date === new Date().toLocaleDateString();
            return (
              <li key={date} className={`attendance-item ${attendance ? 'present' : 'absent'}`}>
                <div className="attendance-date">Date: {date}</div>
                <div className="attendance-login-time">
                  {attendance ? `Login Time: ${new Date(attendance.loginTime).toLocaleTimeString()}` : 'Login Time: N/A'}
                </div>
                <div className="attendance-status">
                  {attendance ? (isToday ? 'Present' : 'Present') : 'Absent'}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
