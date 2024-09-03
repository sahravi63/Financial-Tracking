import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileComponent = ({ onLogout }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/current-user') // Adjust this endpoint as needed
      .then(response => {
        const { name, profilePic } = response.data;
        setUserName(name);
        setProfilePic(profilePic ? profilePic : 'default-avatar.png');
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('userName', userName);
    if (file) {
      formData.append('profilePic', file);
    }

    try {
      await axios.post('/updateProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Profile</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <img
            src={profilePic}
            alt="Profile"
            width="100"
            style={{ borderRadius: '50%' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '10px' }}
          />
        </div>
        <div>
          <p><strong>User Name:</strong></p>
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            style={{ padding: '5px', fontSize: '16px' }}
          />
        </div>
      </div>
      <button
        type="submit"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        Logout
      </button>
    </form>
  );
};

export default ProfileComponent;
