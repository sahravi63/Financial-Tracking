import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Import UserContext

const Profile = () => {
  const { user } = useContext(UserContext); // Use UserContext to get user state

  if (!user) {
    return <h1>You need to log in to view this page</h1>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default Profile;
