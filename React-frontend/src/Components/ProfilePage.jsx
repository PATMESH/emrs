import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const employeeId = localStorage.getItem('employeeId');
    try {
      const response = await fetch(`http://localhost:8080/employees/${employeeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfile(data);
      setEditedProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employees/edit/${profile.employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">Error: {error}</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>
          <h2 className="profile-name">{profile.name}</h2>
        </div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <div className="profile-item">
                <span className="profile-item-title">Name</span>
                <input
                  className="profile-item-value"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Email</span>
                <input
                  className="profile-item-value"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Department</span>
                <input
                  className="profile-item-value"
                  name="department"
                  value={editedProfile.department}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Role</span>
                <input
                  className="profile-item-value"
                  name="role"
                  value={editedProfile.role}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-item">
                <span className="profile-item-title">Employee ID</span>
                <span className="profile-item-value">{profile.employeeId}</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Email</span>
                <span className="profile-item-value">{profile.email}</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Department</span>
                <span className="profile-item-value">{profile.department}</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Role</span>
                <span className="profile-item-value">{profile.role}</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-title">Hire Date</span>
                <span className="profile-item-value">{formatDate(profile.hireDate)}</span>
              </div>
              <div className="profile-actions">
                <button onClick={handleEdit}>Edit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;